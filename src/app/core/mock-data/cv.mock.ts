import { CV, CVSectionType, CVVersion } from '../models/cv.model';

export const MOCK_CV: CV = {
  id: 'cv1',
  fileName: 'John_Doe_CV.docx',
  uploadDate: new Date('2024-01-10'),
  version: CVVersion.BASE,
  skills: [
    'Angular',
    'TypeScript',
    'JavaScript',
    'RxJS',
    'NgRx',
    'HTML',
    'CSS',
    'SCSS',
    'Node.js',
    'REST API',
    'Git',
    'Agile',
    'Scrum'
  ],
  sections: [
    {
      type: CVSectionType.PERSONAL_INFO,
      content: 'John Doe\nEmail: john.doe@email.com\nPhone: +1 (555) 123-4567\nLocation: San Francisco, CA',
      order: 1
    },
    {
      type: CVSectionType.SUMMARY,
      content: 'Experienced Angular Developer with 5+ years of experience in building scalable web applications. Proficient in TypeScript, RxJS, and modern frontend technologies. Strong problem-solving skills and passion for clean code.',
      order: 2
    },
    {
      type: CVSectionType.EXPERIENCE,
      content: 'Senior Angular Developer - TechCorp Inc. (2020-Present)\n- Developed and maintained multiple Angular applications\n- Implemented state management using NgRx\n- Collaborated with cross-functional teams\n\nAngular Developer - StartupXYZ (2018-2020)\n- Built responsive web applications\n- Optimized application performance\n- Mentored junior developers',
      order: 3
    },
    {
      type: CVSectionType.EDUCATION,
      content: 'Bachelor of Science in Computer Science\nUniversity of California, Berkeley (2014-2018)',
      order: 4
    },
    {
      type: CVSectionType.SKILLS,
      content: 'Angular, TypeScript, JavaScript, RxJS, NgRx, HTML, CSS, SCSS, Node.js, REST API, Git, Agile, Scrum',
      order: 5
    }
  ]
};
