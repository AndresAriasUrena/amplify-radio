export default function AurigitalBar({ color }) {
  return (
    <div className="w-full bg-[#1a1a1a]">
      <a
        href="https://aurigital.com?utm_source=amplify-radio&utm_medium=footer&utm_campaign=branding"
        target="_blank"
        rel="noopener"
        className="flex justify-center items-center mx-auto w-full h-10 hover:opacity-80 transition-opacity"
      >
        <span className="text-white uppercase text-xs text-center px-2">
          Creado por Aurigital
        </span>
        <img
          src="/isotipo.avif"
          alt="Aurigital - Design and Development"
          className="h-5 w-5 ml-1"
        />
      </a>
    </div>
  );
}
