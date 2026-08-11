"use client";

import { useState } from "react";
import { track } from "../analytics";
import type { Question, VideoId } from "../types";
import { VIDEO_CONFIG } from "../video-config";
import styles from "../test.module.css";

interface Props {
  question: Extract<Question, { type: "video" }>;
}

export function VideoPanel({ question }: Props) {
  const [open, setOpen] = useState(false);
  const video = VIDEO_CONFIG[question.videoId as VideoId];

  return (
    <div className={styles.videoPanel}>
      <button
        className={styles.videoToggle}
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          if (!open) track("test_video_open", { video_id: question.videoId });
        }}
      >
        <span className={styles.playIcon}>{open ? "×" : "▶"}</span>
        <span>
          <b>{open ? "Скрыть пример" : "Посмотреть пример"}</b>
          <small>Видео · 30–45 секунд</small>
        </span>
      </button>
      {open && (
        <div className={styles.videoBody}>
          <div className={styles.videoFrame}>
            <iframe
              src={video.url}
              title={video.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock"
              allowFullScreen
            />
          </div>
          <div className={styles.instructions}>
            <span>КАК ВЫПОЛНИТЬ</span>
            <ol>{question.instructions.map((item) => <li key={item}>{item}</li>)}</ol>
            <p><b>Смотрите:</b> {question.watchFor}</p>
          </div>
        </div>
      )}
    </div>
  );
}
