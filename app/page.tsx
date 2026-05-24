import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import EducationAndCertifications from './_components/EducationAndCertifications';
import GitHubContributions from './_components/GitHubContributions';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <EducationAndCertifications />
            <ProjectList />
            <GitHubContributions />
        </div>
    );
}
