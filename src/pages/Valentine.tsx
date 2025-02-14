import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function Valentine() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isCorrectDate, setIsCorrectDate] = useState<boolean | null>(null);
  const correctDate = import.meta.env.VITE_FIRST_MEET_DATE; // Must be in YYYY-MM-DD format
  const incorrectDateMessages = [
    "Oops! Try again. 😢",
    "Not quite right. 😢",
    "Close, but not quite. 😢",
    "Oh no! Try again. 😢",
    "Not the right date. 😢",
  ];

  const moveNoButton = () => {
    const margin = 100;
    const buttonSize = 100;
    const safeWidth = window.innerWidth - buttonSize - margin;
    const safeHeight = window.innerHeight - buttonSize - margin;
    let x = Math.random() * safeWidth - safeWidth / 2;
    let y = Math.random() * (safeHeight / 2) - safeHeight / 4;
    setNoPosition({ x, y });
  };

  const handleDateConfirm = () => {
    if (selectedDate && format(selectedDate, "yyyy-MM-dd") === correctDate) {
      setIsCorrectDate(true);
    } else {
      setIsCorrectDate(false);
    }
  };

  if (isCorrectDate) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-500 text-white text-center">
        <img
          src="https://media.giphy.com/media/9Y1LEFKsbbP4hrLgV3/giphy.gif"
          alt="heart"
          className="m-10"
        />
        <h1 className="text-5xl font-bold"> You remembered! </h1>
        <p className="text-2xl mt-4">
          You are the sweetest! Happy Valentine's Day! ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-rose-950/20 text-center relative overflow-hidden">
      {!showDatePicker ? (
        <>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmx4bTg0NWhncWpsMnJqNGh4cXV0enB2MmxybXg1YmtlNjF3MXZjYiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/mXpFZCVJeYTXW/giphy.gif"
            alt="heart"
            className="w-1/2 m-10"
          />
          <h1 className="text-4xl font-bold mb-6 text-red-600">
            Will you be my Valentine? ❤️
          </h1>
          <div className="flex gap-4 relative">
            <Button
              className="px-6 py-3 text-lg"
              onClick={() => setShowDatePicker(true)}
            >
              Yes
            </Button>
            <motion.div
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 50 }}
              className="inline-block"
            >
              <Button
                className="px-6 py-3 text-lg text-white bg-red-500 hover:bg-red-600"
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
              >
                No
              </Button>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            When did we first meet? 💕
          </h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            ISOWeek
            className="rounded-md border shadow"
          />
          <Button className="mt-4" onClick={handleDateConfirm}>
            Confirm
          </Button>
          {isCorrectDate === false && (
            <p className="text-red-500 mt-2">
              {
                incorrectDateMessages[
                  Math.floor(Math.random() * incorrectDateMessages.length)
                ]
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
}
