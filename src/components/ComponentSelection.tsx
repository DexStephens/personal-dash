const components = ["Calendar", "Goals", "Documents", "To-Do", "Contact"];

export default function ComponentSelection({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="component-selector">
      {components.map((component) => (
        <div
          className="component-pill"
          style={{
            backgroundColor: selected.includes(component) ? "red" : "lightblue",
          }}
          onClick={() =>
            setSelected((current) => {
              if (current.includes(component)) {
                return current.filter((value) => value !== component);
              } else {
                return [...current, component];
              }
            })
          }
        >
          <p>{component}</p>
          <p>C</p>
        </div>
      ))}
    </div>
  );
}
