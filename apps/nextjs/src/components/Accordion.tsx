import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Show = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
};

type AccordionProps = {
  i: number;
  expanded: false | number;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
  show: Show;
};

const Accordion = ({ i, expanded, setExpanded, show }: AccordionProps) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <div className="w-1/2 overflow-hidden">
      <motion.header
        className="mb-5 flex h-24 cursor-pointer items-center justify-between border-4 border-[#4C5558] p-4 text-lg font-bold text-slate-800"
        initial={false}
        animate={{ backgroundColor: isOpen ? "#A7B8C2" : "#DFECEC" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <p>{show.Title}</p>
        <p>
          {show.Year} - {show.Runtime}
        </p>
        <img src={show.Poster} alt={show.Title} className="w-12" />
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p className="mb-4 text-justify">
              This show is perfect for anyone who loves light-hearted comedy as
              it follows a group of local government employees in Pawnee,
              Indiana. It stars Amy Poehler as the lead and follows her
              character as she attempts to make her hometown a better place to
              live. The show has awesome characters, witty dialogue, and great
              humor which is sure to keep someone with the users preferences
              entertained. This show is perfect for anyone who loves
              light-hearted comedy as it follows a group of local government
              employees in Pawnee, Indiana. It stars Amy Poehler as the lead and
              follows her character as she attempts to make her hometown a
              better place to live. The show has awesome characters, witty
              dialogue, and great humor which is sure to keep someone with the
              users preferences entertained. This show is perfect for anyone who
              loves light-hearted comedy as it follows a group of local
              government employees in Pawnee, Indiana. It stars Amy Poehler as
              the lead and follows her character as she attempts to make her
              hometown a better place to live. The show has awesome characters,
              witty dialogue, and great humor which is sure to keep someone with
              the users preferences entertained. This show is perfect for anyone
              who loves light-hearted comedy as it follows a group of local
              government employees in Pawnee, Indiana. It stars Amy Poehler as
              the lead and follows her character as she attempts to make her
              hometown a better place to live. The show has awesome characters,
              witty dialogue, and great humor which is sure to keep someone with
              the users preferences entertained.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
