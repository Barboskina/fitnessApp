import { Star, Users, Calendar, Zap, Target, Heart } from 'lucide-react';

export const STATS = [
  { 
    icon: Users, 
    number: "100+", 
    label: "Довольных участниц", 
    color: "text-pink-600",
    delay: 0.1
  },
  { 
    icon: Calendar, 
    number: "10+", 
    label: "Еженедельных занятий", 
    color: "text-gray-800",
    delay: 0.2
  },
  { 
    icon: Star, 
    number: "4.9", 
    label: "Высокий рейтинг", 
    color: "text-amber-600",
    delay: 0.3
  }
];

export const FEATURES = [
  { 
    icon: Zap, 
    title: "Только женское окружение", 
    description: "Здесь вы можете чувствовать себя спокойно и уверенно. Мы никого не осуждаем." 
  },
  { 
    icon: Target, 
    title: "Специализированные программы", 
    description: "Тренировки, которые подходят именно для женщин и помогают достичь целей." 
  },
  { 
    icon: Heart, 
    title: "Поддерживающее сообщество", 
    description: "Найдете подруг, которые тоже занимаются спортом, и подружитесь с ними." 
  }
];

export const CONTACT_INFO = {
  address: "г. Волгоград, ул. Ленина, 100, 3 этаж",
  phone: "+7 (999) 123-45-67",
  email: "mne-mozhno@mail.ru",
  telegram: "https://t.me/mnemozhno"
};