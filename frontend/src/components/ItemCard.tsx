import "../css/ItemCard.css";

type Props = {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  onAdd: (id: number) => void;
};

export default function ItemCard({ item, onAdd }: Props) {
  return (
    <div className="item-card">
      <div>
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
      </div>

      <div>
        <div className="item-price">{item.price} RSD</div>

        <button
          className="item-button"
          onClick={() => onAdd(item.id)}
        >
          Dodaj u korpu
        </button>
      </div>
    </div>
  );
}