interface Experience {
    title: string;
    imgPath: string;
    duration: string;
    designation: string;
    mode: string;
    location: string;
    description: string;
    skills: string[];
}

const experienceData: Experience[] = [
    {
        title: 'fainin',
        imgPath: 'fainin-logo.png',
        duration: 'Nov 2023 - Feb 2024',
        designation: 'Frontend Intern',
        mode: 'Remote',
        location: 'Germany',
        description: 'Gained hands-on experience with Angular, and how it interacts with backend using GraphQL',
        skills: ['Angular', 'GraphQL', 'Jira']
    },
    
    {
        title: 'Analog Mutations',
        imgPath: 'analog-mutations-logo.png',
        duration: 'June 2023 - Oct 2023',
        designation: 'Blockchain Intern',
        mode: 'Hybrid',
        location: 'Karachi',
        description: 'Developed, finetuned, dockerized and deployed Generative AI Models on a blockchain platform.',
        skills: ['Python', 'Dockers', 'Solidity']
    },
];
export default experienceData;

