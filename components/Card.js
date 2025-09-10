export default function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
      {children}
    </div>
  );
}
