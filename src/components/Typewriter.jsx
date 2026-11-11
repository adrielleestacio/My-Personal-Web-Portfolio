import { useEffect, useState } from "react";

/**
 * Types and deletes through a list of words on a loop. Shows the first word
 * statically under reduced motion.
 */
export const Typewriter = ({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 1600,
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }

    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((v) => (v + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText(
            word.substring(0, deleting ? text.length - 1 : text.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 animate-pulse font-normal text-primary" aria-hidden="true">
        |
      </span>
    </span>
  );
};
