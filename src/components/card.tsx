function Card({
  text = "aouga",
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white/100">
      <h3>{text}</h3>
      {children}
    </div>
  );
}

export default Card;
