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
      <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p>{item.price} RSD</p>
  
        <button onClick={() => onAdd(item.id)}>
          Dodaj u korpu
        </button>
      </div>
    );
  }