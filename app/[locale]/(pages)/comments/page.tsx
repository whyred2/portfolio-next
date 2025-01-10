"use client";

import React from "react";
import { CommentSection } from "@/components/ui/comment-section";
import CommentItem from "@/components/comment-item";
import { CommentForm } from "@/components/comment-form";
import { Icons } from "@/components/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface Comment {
  id: number;
  userId: number;
  user: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
}

export default function CommentsPage() {
  const [openSection, setOpenSection] = React.useState<string | null>(null);
  const [animatingSection, setAnimatingSection] = React.useState<string | null>(
    null
  );
  const [scrollMask, setScrollMask] = React.useState(
    "linear-gradient(black 85%, transparent)"
  );

  const [comments, setComments] = React.useState<{ [key: string]: Comment[] }>(
    {}
  );
  const [loading, setLoading] = React.useState<{ [key: string]: boolean }>({});
  const [error, setError] = React.useState<{ [key: string]: string | null }>(
    {}
  );

  const [isComplaining, setIsComplaining] = React.useState<boolean>(false);
  const [isValue, setIsValue] = React.useState<string>("");
  const [isCommentId, setIsCommentId] = React.useState<number>(0);
  const [isType, setIsType] = React.useState<string>("");

  const HEADER_HEIGHT = 84;
  const SECTION_SPACING = 20;

  const toggleSection = async (id: string, type: string) => {
    setAnimatingSection(id);
    setOpenSection((prev) => (prev === id ? null : id));

    if (!comments[type] && !loading[type] && !error[type]) {
      setLoading((prev) => ({ ...prev, [type]: true }));
      try {
        const fetchedComments = await fetchComments(type);
        setComments((prev) => ({ ...prev, [type]: fetchedComments }));
      } catch (err) {
        console.error(
          `Ошибка при загрузке комментариев для типа ${type}:`,
          err
        );
        setError((prev) => ({
          ...prev,
          [type]: "Не удалось загрузить комментарии.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }));
      }
    }
  };

  const fetchComments = async (type: string): Promise<Comment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const res = await fetch(`/api/comments/${type}`);
    if (!res.ok) {
      throw new Error(`Не удалось получить комментарии для типа ${type}`);
    }
    return res.json();
  };

  const handleComplain = async () => {
    const response = await fetch(`/api/comments/complain`, {
      method: "POST",
      body: JSON.stringify({
        commentId: isCommentId,
        type: isType,
        reason: isValue,
      }),
    });

    if (!response.ok) {
      return toast({
        title: "Ошибка",
        description: "Не удалось отправить жалобу.",
      });
    }

    toast({
      title: "Успех",
      description: "Жалоба успешно отправлена.",
    });

    setIsValue("");
    setIsCommentId(0);
    setIsType("");
    setIsComplaining(false);
    return true;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isTop = scrollTop <= 50;
    const isBottom = scrollTop + clientHeight >= scrollHeight;

    if (isTop && isBottom) {
      setScrollMask("none");
    } else if (isTop) {
      setScrollMask("linear-gradient(black 85%, transparent)");
    } else if (isBottom) {
      setScrollMask("linear-gradient(transparent, black 15%)");
    } else {
      setScrollMask(
        "linear-gradient(transparent 0%, black 15%, black 85%, transparent 100%)"
      );
    }
  };

  const handleAddComment = (type: string, newComment: Comment) => {
    setComments((prev) => ({
      ...prev,
      [type]: [newComment, ...(prev[type] || [])],
    }));
  };

  const handleUpdateComment = (
    commentType: string,
    updatedComment: Comment
  ) => {
    setComments((prev) => ({
      ...prev,
      [commentType]: prev[commentType].map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      ),
    }));
  };

  const handleDeleteComment = (commentId: number, commentType: string) => {
    setComments((prev) => ({
      ...prev,
      [commentType]: prev[commentType].filter(
        (comment) => comment.id !== commentId
      ),
    }));
  };

  const sections = [
    {
      id: "0",
      type: "Questions",
      title: "Вопросы и ответы",
      subtitle: "Здесь вы можете задать свой вопрос.",
      className: "bg-indigo-900",
    },
    {
      id: "1",
      type: "Wishes",
      title: "Пожелания",
      subtitle: "Здесь вы можете оставить свои пожелания автору.",
      className: "bg-teal-800",
    },
    {
      id: "2",
      type: "Reviews",
      title: "Отзывы",
      subtitle: "Здесь вы можете оставить свой отзыв.",
      className: "bg-slate-600",
    },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {sections.map((section) => (
        <CommentSection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          className={section.className}
          headerHeight={HEADER_HEIGHT}
          sectionSpacing={SECTION_SPACING}
          totalSections={sections.length}
          isOpen={openSection === section.id}
          isAnimating={animatingSection === section.id}
          onToggle={() => toggleSection(section.id, section.type)}
        >
          <CommentForm type={section.type} onAddComment={handleAddComment} />
          <div className="border-t w-8/12 border-neutral-200/50" />
          <div
            onScroll={handleScroll}
            className="flex flex-col gap-2 h-[calc(100vh-40%)] w-full overflow-y-auto hide-scrollbar"
            style={{
              maskImage: scrollMask,
              scrollbarWidth: "none",
            }}
          >
            {loading[section.type] ? (
              Array.from({ length: 4 }).map((_, index) => (
                <CommentItem.Skeleton key={index} />
              ))
            ) : error[section.type] ? (
              <div className="text-red-500">{error[section.type]}</div>
            ) : comments[section.type] && comments[section.type].length > 0 ? (
              comments[section.type].map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  type={section.type}
                  onComplain={() => {
                    setIsComplaining(true);
                    setIsCommentId(comment.id);
                    setIsType(section.type);
                  }}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                />
              ))
            ) : (
              <p>Нет комментариев.</p>
            )}
          </div>
        </CommentSection>
      ))}
      {isComplaining && (
        <>
          <div className="fixed z-50 inset-0 backdrop-blur-sm animate-overlayShow" />
          <div className="-translate-x-1/2 -translate-y-1/2 fixed z-50 left-1/2 top-1/2 bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-xl p-5 max-w-[400px] rounded-lg animate-contentShow">
            <div className="flex justify-between items-center">
              <div className="text-2xl">Пожаловаться</div>
              <button
                onClick={() => {
                  setIsComplaining(false);
                  setIsValue("");
                  setIsCommentId(0);
                  setIsType("");
                }}
              >
                <Icons.close className="w-8 h-8" />
              </button>
            </div>

            <div className="h-px bg-black/30 dark:bg-white/30 my-5 -mx-5" />

            <div className="">
              <div className="text-xl">Выберите причину жалобы</div>
              <RadioGroup defaultValue="" className="text-lg">
                <div
                  className="flex items-center gap-3"
                  onClick={() => setIsValue("spam")}
                >
                  <RadioGroupItem id="r1" value="spam" />
                  <Label htmlFor="r1" className="flex items-center h-12 w-full">
                    Спам или ложная информация
                  </Label>
                </div>
                <div
                  className="flex items-center gap-3"
                  onClick={() => setIsValue("insult")}
                >
                  <RadioGroupItem id="r2" value="insult" />
                  <Label htmlFor="r2" className="flex items-center h-12 w-full">
                    Оскорбления или проявления нетерпимости
                  </Label>
                </div>
                <div
                  className="flex items-center gap-3"
                  onClick={() => setIsValue("other")}
                >
                  <RadioGroupItem id="r3" value="other" />
                  <Label htmlFor="r3" className="flex items-center h-12 w-full">
                    Другое
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <button
              disabled={!isValue}
              className={cn(
                buttonVariants({
                  variant: isValue ? "default" : "disabled",
                  size: "xs",
                }),
                "w-full mt-2 rounded-md"
              )}
              onClick={() => handleComplain()}
            >
              Отправить
            </button>
          </div>
        </>
      )}
    </div>
  );
}
