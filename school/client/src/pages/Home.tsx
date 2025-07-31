const Home = () => (
  <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-white rounded-xl shadow-lg ">
    <div className="absolute inset-0 -z-10 bg-accent/10 rounded-xl blur-[80px]" />

    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary text-center tracking-tight drop-shadow-sm animate-fade-in">
      Welcome to Achievers School Portal
    </h1>

    <p className="text-lg sm:text-xl text-secondary text-center mt-6 max-w-3xl leading-relaxed animate-fade-in delay-200">
      Empowering students to reach their highest potential. Manage your students
      efficiently and beautifully with our modern portal.
    </p>
  </section>
);

export default Home;
