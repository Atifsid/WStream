export default function Button({
  click,
  text,
  disabled,
}: {
  click: any;
  text: string;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={click}
      className={`bg-cyan-700 hover:${
        disabled ? "bg-cyan-950" : "bg-cyan-600"
      } ${
        disabled && "bg-cyan-950"
      } text-white font-bold py-2 px-4 rounded-full`}
    >
      {text}
    </button>
  );
}
