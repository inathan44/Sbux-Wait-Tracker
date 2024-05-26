import Header from "@/components/Header";

const About = () => {
  document.title = "About";
  return (
    <>
      <Header />
      <p className="mx-auto mt-8 max-w-96 text-center">
        This project is not affiliated with Starbucks in any way. It is a tool
        used to track what a store is waiting on to then analyze it and use it
        to improve drive thru times.
      </p>
    </>
  );
};

export default About;
