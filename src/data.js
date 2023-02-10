import book from './assets/images/book.png';

export const bookGenres = [
  {
    id: 1,
    title: 'Бизнес-книги',
    value: 'business',
    amount: 14
  },
  {
    id: 2,
    title: 'Детективы',
    value: 'detectives',
    amount: 8
  },
  {
    id: 3,
    title: 'Детские книги',
    value: 'children',
    amount: 14
  },
  {
    id: 4,
    title: 'Зарубежная литература',
    value: 'foreign',
    amount: 2
  },
  {
    id: 5,
    title: 'История',
    value: 'history',
    amount: 5
  },
  {
    id: 6,
    title: 'Классическая литература',
    value: 'classical',
    amount: 12
  },
  {
    id: 7,
    title: 'Книги по психологии',
    value: 'psychology',
    amount: 11
  },
  {
    id: 8,
    title: 'Компьютерная литература',
    value: 'computer',
    amount: 54
  },
  {
    id: 9,
    title: 'Культура и искусство',
    value: 'culture',
    amount: 5
  },
  {
    id: 10,
    title: 'Наука и образование',
    value: 'science',
    amount: 2
  },
  {
    id: 11,
    title: 'Публицистическая литература',
    value: 'journalistic',
    amount: 0
  },
  {
    id: 12,
    title: 'Справочники',
    value: 'reference',
    amount: 10
  },
  {
    id: 13,
    title: 'Фантастика',
    value: 'fantasy',
    amount: 12
  },
  {
    id: 14,
    title: 'Юмористическая литература',
    value: 'humor',
    amount: 8
  },
];

export const books = [
  {
    id: 1,
    title: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    author: 'Адитья Бхаргава, 2019',
    rating: 4,
    gallery: [],
    booked: false,
  },
  {
    id: 2,
    title: 'Программирование на JAVA',
    author: 'Патрик Нимейер, Дэниэл Леук, 2013',
    rating: 4,
    gallery: [book],
    booked: false,
  },
  {
    id: 3,
    title: 'Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress',
    author: 'Джи Ким, Нейт Купер, 2019',
    rating: 4,
    gallery: [book, book],
    booked: false,
  },
  {
    id: 4,
    title: 'HTML5 и CSS3. Разработка сайтов для любых браузеров и устройств',
    author: 'Бен Фрейн, 2014',
    rating: 4,
    gallery: [book, book, book],
    booked: true,
  },
  {
    id: 5,
    title: 'Adobe Flash. Создание аркад, головоломок и других игр с помощью ActionScript',
    author: 'Гэри Розенцвейг, 2009',
    rating: null,
    gallery: [book, book, book, book],
    booked: false,
  },
  {
    id: 6,
    title: 'Грокаем алгоритмы. Иллюстрированное',
    author: '2013',
    rating: 4,
    gallery: [book, book, book, book],
    booked: false,
  },
  {
    id: 7,
    title: 'HTML5. Разработка приложений для мобильных устройств',
    author: 'Эстель Вейл, 2015',
    rating: 4,
    gallery: [book, book, book, book],
    booked: false,
  },
  {
    id: 8,
    title: 'Быстро и легко создаем, программируем и раскручиваем',
    author: 'Олег Поломошнов, 2011',
    rating: 4,
    gallery: [book, book, book, book],
    booked: false,
  },
  {
    id: 9,
    title: 'Грокаем алгоритмы. Иллюстрированное',
    author: 'Борис Пахомов, 2014',
    rating: 4,
    gallery: [book, book, book, book],
    booked: false,
  }
]

export const reviews = [
  {
    id: 1,
    name: 'Иван Иванов',
    date: '5 января 2019',
    report: ''
  },
  {
    id: 2,
    name: 'Николай Качков',
    date: '20 июня 2018',
    report: 'Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.'
  },
  {
    id: 3,
    name: 'Иван Иванов',
    date: '18 февраля 2018',
    report: ''
  }
];