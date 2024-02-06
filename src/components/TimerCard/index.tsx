import "./timeCard.css";

type TimerCardProps = {
  title: string;
  subtitle: string | number;
};

const TimerCard: React.FC<TimerCardProps> = ({ title, subtitle }) => {
  return (
    <div className="time-card">
      <span className="txt">{title}</span>
      <span className="count">{subtitle}</span>
    </div>
  );
};

export default TimerCard;
