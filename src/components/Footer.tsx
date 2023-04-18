export default function Footer() {
  return (
    <footer className="bg-color-secondary py-8">
      <div className="container flex items-center justify-between">
        <small className="flex items-center text-white">
          Made with React
          <span className="material-symbols-outlined ml-1.5 text-[20px]">
            code
          </span>
        </small>

        <a
          href="https://github.com/Rostyk27/react-shop/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-color-primary"
        >
          <small className="flex items-center">
            Source code
            <span className="material-symbols-outlined ml-1.5 text-[20px]">
              deployed_code
            </span>
          </small>
        </a>
      </div>
    </footer>
  );
}
