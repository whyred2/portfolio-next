"use client";

import * as React from "react";

import Cursor from "@/components/cursor";
import { PlayerButton, PlayerSlider } from "@/components/ui/video";
import { PlayerSettings } from "@/components/player-settings";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

// Форматирует секунды в строку "mm:ss"
function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "00:00";
  const floored = Math.floor(seconds);
  const mm = Math.floor(floored / 60)
    .toString()
    .padStart(2, "0");
  const ss = (floored % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

// Типы для стейта и экшенов
type State = {
  isPlaying: boolean; // Воспроизведение
  volume: number; // Громкость (0–100)
  time: number; // Проценты (0–100)
  current: number; // Текущее время в секундах
  duration: number; // Длительность видео в секундах
  showControls: boolean; // Показывать панель управления
  isBuffering: boolean; // Буфферизация
  isChangingTime: boolean; // Изменение времени
  isOpenedSettings?: boolean; // Открытые настройки
  videoSpeed: number; // Скорость видео
  isExpanded?: boolean; // Полноэкранный режим
};

// Типы для экшенов
type Action =
  | { type: "PLAY_PAUSE"; payload?: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_CURRENT"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "TOGGLE_CONTROLS"; payload?: boolean }
  | { type: "SET_BUFFERING"; payload: boolean }
  | { type: "SET_CHANGING_TIME"; payload: boolean }
  | { type: "SET_OPEN_SETTINGS"; payload: boolean }
  | { type: "SET_VIDEO_SPEED"; payload: number }
  | { type: "SET_EXPANDED"; payload: boolean };

// Начальное состояние
const initialState: State = {
  isPlaying: false,
  volume: 50,
  time: 0,
  current: 0,
  duration: 0,
  showControls: true,
  isBuffering: false,
  isChangingTime: false,
  isOpenedSettings: false,
  videoSpeed: 1,
  isExpanded: false,
};

// Редьюсер для управления состоянием
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "PLAY_PAUSE":
      return { ...state, isPlaying: action.payload ?? !state.isPlaying };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "TOGGLE_CONTROLS":
      return { ...state, showControls: action.payload ?? !state.showControls };
    case "SET_BUFFERING":
      return { ...state, isBuffering: action.payload };
    case "SET_CHANGING_TIME":
      return { ...state, isChangingTime: action.payload };
    case "SET_OPEN_SETTINGS":
      return { ...state, isOpenedSettings: action.payload };
    case "SET_VIDEO_SPEED":
      return { ...state, videoSpeed: action.payload };
    case "SET_EXPANDED":
      return { ...state, isExpanded: action.payload };
    default:
      return state;
  }
}

interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const playerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const settingsRef = React.useRef<HTMLDivElement>(null);
  const controlsTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const {
    isPlaying,
    volume,
    time,
    current,
    duration,
    showControls,
    isBuffering,
    isChangingTime,
    isOpenedSettings,
    videoSpeed,
    isExpanded,
  } = state;

  // Обновление состояния видео
  React.useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleDurationChange = () => {
      dispatch({ type: "SET_DURATION", payload: videoEl.duration || 0 });
    };

    const handleTimeUpdate = () => {
      const currentSec = videoEl.currentTime;
      dispatch({ type: "SET_CURRENT", payload: currentSec });
      const ratio = (currentSec / videoEl.duration) * 100 || 0;
      dispatch({ type: "SET_TIME", payload: ratio });
    };

    const handleEnded = () => {
      dispatch({ type: "PLAY_PAUSE", payload: false });
    };

    const handleSeeking = () => {
      dispatch({ type: "SET_BUFFERING", payload: true });
    };

    const handleSeeked = () => {
      dispatch({ type: "SET_BUFFERING", payload: false });
    };

    videoEl.addEventListener("loadedmetadata", handleDurationChange);
    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", handleEnded);
    videoEl.addEventListener("seeking", handleSeeking);
    videoEl.addEventListener("seeked", handleSeeked);

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleDurationChange);
      videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      videoEl.removeEventListener("ended", handleEnded);
      videoEl.removeEventListener("seeking", handleSeeking);
      videoEl.removeEventListener("seeked", handleSeeked);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  // Монтирование компонента и установка громкости
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  // Инициализация громкости и скорости при монтировании
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // Инициализация громкости
      if (!localStorage.getItem("pl-volume")) {
        localStorage.setItem(
          "pl-volume",
          JSON.stringify({ volume: 50, muted: false })
        );
      }
      const volumeData = JSON.parse(localStorage.getItem("pl-volume")!);
      dispatch({ type: "SET_VOLUME", payload: volumeData.volume });
      if (videoRef.current) {
        videoRef.current.volume = volumeData.volume / 100;
      }

      // Инициализация скорости
      const storedSpeed = localStorage.getItem("pl-speed");
      if (storedSpeed) {
        const parsedSpeed = parseFloat(storedSpeed);
        dispatch({ type: "SET_VIDEO_SPEED", payload: parsedSpeed });
      } else {
        localStorage.setItem("pl-speed", "1");
      }
    }
  }, []);

  // Обработчик клика вне настроек и полноэкранного режима
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node)
      ) {
        dispatch({ type: "SET_OPEN_SETTINGS", payload: false });
      }
    }

    function handleFullscreenChange() {
      const isFull = !!document.fullscreenElement;
      dispatch({ type: "SET_EXPANDED", payload: isFull });
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Обработчик клавиатуры
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!videoRef.current) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          e.stopPropagation();
          if (e.key === " " || e.code === "Space") {
            handlePlayPause();
          }
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 5;
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 5;
          break;
        case "KeyF":
          handleExpandChange();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, isExpanded]);

  // Управление воспроизведением
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    dispatch({ type: "PLAY_PAUSE" });
  };

  // Перемотка
  const handleTimeChange = (val: number[]) => {
    if (!videoRef.current) return;
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    const ratio = val[0];
    const newTime = (ratio / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = newTime;
    dispatch({ type: "SET_CURRENT", payload: newTime });
    dispatch({ type: "SET_TIME", payload: ratio });

    dispatch({ type: "SET_CHANGING_TIME", payload: true });
    setTimeout(() => {
      dispatch({ type: "SET_CHANGING_TIME", payload: false });
    }, 100);
  };

  // Управление громкостью
  const handleVolumeClick = () => {
    if (!videoRef.current) return;
    const storedVolume = JSON.parse(localStorage.getItem("pl-volume")!);

    if (storedVolume.muted === true) {
      if (storedVolume.volume === 0) {
        localStorage.setItem(
          "pl-volume",
          JSON.stringify({ volume: 50, muted: false })
        );
        videoRef.current.volume = 50 / 100;
        dispatch({ type: "SET_VOLUME", payload: 50 });
      } else {
        localStorage.setItem(
          "pl-volume",
          JSON.stringify({ volume: storedVolume.volume, muted: false })
        );
        videoRef.current.volume = storedVolume.volume / 100;
        dispatch({ type: "SET_VOLUME", payload: storedVolume.volume });
      }
    } else if (storedVolume.volume !== 0) {
      localStorage.setItem(
        "pl-volume",
        JSON.stringify({ volume: storedVolume.volume, muted: true })
      );
      videoRef.current.volume = 0;
      dispatch({ type: "SET_VOLUME", payload: 0 });
    }
  };

  // Управление ползунком громкости
  const handleVolumeChange = (val: number[]) => {
    if (!videoRef.current) return;
    const newVolume = val[0];
    videoRef.current.volume = newVolume / 100;
    if (newVolume === 0) {
      localStorage.setItem(
        "pl-volume",
        JSON.stringify({ volume: newVolume, muted: true })
      );
    } else {
      localStorage.setItem(
        "pl-volume",
        JSON.stringify({ volume: newVolume, muted: false })
      );
    }
    dispatch({ type: "SET_VOLUME", payload: newVolume });
  };

  // Скрытие/показ контролов
  const handleMouseMove = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    dispatch({ type: "TOGGLE_CONTROLS", payload: true });
    if (!isPlaying) return;
    if (isChangingTime) return;
    controlsTimeout.current = setTimeout(() => {
      dispatch({ type: "TOGGLE_CONTROLS", payload: false });
    }, 1500);
  };

  // Открытие/закрытие настроек видео
  const handleOpenSettings = () => {
    if (isOpenedSettings === true) {
      dispatch({ type: "SET_OPEN_SETTINGS", payload: false });
    } else {
      dispatch({ type: "SET_OPEN_SETTINGS", payload: true });
    }
  };

  // Изменение скорости видео
  const handleSpeedChange = (speed: number) => {
    dispatch({ type: "SET_VIDEO_SPEED", payload: speed });
    localStorage.setItem("pl-speed", speed.toString());
  };

  // Полноэкранный режим
  const handleExpandChange = () => {
    if (!playerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={playerRef}
      className="flex flex-col items-center justify-center w-full h-full mx-auto relative"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={url}
        preload="metadata"
        playsInline
        onClick={handlePlayPause}
        onDoubleClick={handleExpandChange}
        className={cn(
          "bg-black w-full",
          isExpanded ? "max-h-full" : "max-h-[600px]"
        )}
      />
      {isBuffering && (
        <div className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none">
          <Icons.spinner className="w-20 h-20 animate-spin text-white" />
        </div>
      )}
      {/* Показывать кастомный курсор в полноэкранном режиме */}
      {isExpanded && <Cursor />}
      {/* Запретит пуск/паузу видео при зыкрытии настроек */}
      {isOpenedSettings && <div className="absolute inset-0" />}
      <div
        className={cn(
          showControls ? "opacity-1" : "opacity-0",
          isOpenedSettings && "opacity-1",
          "text-white flex gap-2 items-center justify-between absolute bottom-2 left-2 right-2 h-8 transition-opacity duration-100"
        )}
      >
        <PlayerButton
          onClick={handlePlayPause}
          className="px-4 hover:bg-white/40 active:bg-active"
        >
          {isPlaying ? (
            <Icons.pause className="w-5 h-5 fill-white" />
          ) : (
            <Icons.play className="w-5 h-5 fill-white" />
          )}
        </PlayerButton>

        <PlayerButton className="w-full">
          <div className="flex-1">
            <PlayerSlider value={[time]} onValueChange={handleTimeChange} />
          </div>
          <span className="text-xs">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </PlayerButton>

        <PlayerButton>
          <div className="flex gap-2 items-center">
            <button onClick={handleVolumeClick}>
              {volume === 0 ? (
                <Icons.volumeX className="w-5 h-5" />
              ) : volume < 50 ? (
                <Icons.volume1 className="w-5 h-5" />
              ) : (
                <Icons.volume2 className="w-5 h-5" />
              )}
            </button>
            <PlayerSlider
              value={[volume]}
              className="w-16"
              onValueChange={handleVolumeChange}
            />
          </div>
        </PlayerButton>
        <div ref={settingsRef} className="h-full">
          <PlayerButton
            className="relative hover:bg-white/40 active:bg-active"
            onClick={handleOpenSettings}
          >
            <Icons.bolt
              className={cn(
                "w-5 h-5 transition-all duration-300",
                isOpenedSettings ? "rotate-90" : "rotate-0"
              )}
            />
          </PlayerButton>
          <PlayerSettings
            videoSpeed={videoSpeed}
            onSpeedChange={handleSpeedChange}
            className={cn(
              !isOpenedSettings && "translate-x-[calc(250px+8px)]",
              "transition-transform ease-in-out duration-300"
            )}
          />
        </div>
        <PlayerButton className="hover:bg-white/40 active:bg-active">
          <button onClick={handleExpandChange}>
            {isExpanded ? (
              <Icons.shrink className="w-5 h-5" />
            ) : (
              <Icons.expand className="w-5 h-5" />
            )}
          </button>
        </PlayerButton>
      </div>
    </div>
  );
}
