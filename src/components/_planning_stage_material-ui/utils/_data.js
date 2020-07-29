export const userProfiles = {
  Melania: {
    id: "melania",
    name: "Melania",
    avatar: {
      name: "melania",
      src: "/images/avatars/Girl1.png",
    },
  },
  Elena: {
    id: "elena",
    name: "Elena",
    avatar: {
      name: "elena",
      src: "/images/avatars/Girl2.png",
    },
  },
  Daniela: {
    id: "daniela",
    name: "Daniela",
    avatar: {
      name: "daniela",
      src: "/images/avatars/Girl3.png",
    },
  },
  Adi: {
    id: "adi",
    name: "Adi",
    avatar: {
      name: "adi",
      src: "/images/avatars/Boy1.png",
    },
  },
  Cristi: {
    id: "cristi",
    name: "Cristi",
    avatar: {
      name: "cristi",
      src: "/images/avatars/Boy2.png",
    },
  },
  Sabin: {
    id: "sabin",
    name: "Sabin",
    avatar: {
      name: "sabin",
      src: "/images/avatars/Boy3.png",
    },
  },
};

export const questionsByAnsweredOrUnanswered = {
  unanswered: [
    {
      qid: 4,
      author: "Melania",
      avatar: "/images/avatars/Girl1.png",
      question: "Ce faci Blondie?",
    },
    {
      qid: 5,
      author: "Adi",
      avatar: "/images/avatars/Boy1.png",
      question: "Cand ne vedem?",
    },
    {
      qid: 6,
      author: "Elena",
      avatar: "/images/avatars/Girl2.png",
      question: "Daca as termina mai repede proiectul asta",
    },
  ],
  answered: [
    {
      qid: 1,
      author: "Daniela",
      avatar: "/images/avatars/Girl3.png",
      question: "Ti-e dor de AcademyPlus?",
    },
    {
      qid: 2,
      author: "Cristi",
      avatar: "/images/avatars/Boy2.png",
      question: "Hai la bere si iti explic apoi",
    },
    {
      qid: 3,
      author: "Sabin",
      avatar: "/images/avatars/Boy3.png",
      question: "Gasiti codul la https://...",
    },
  ],
};
export default questionsByAnsweredOrUnanswered;
