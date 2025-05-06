import { useTheme } from './ThemeContext';

function ListaItem({ item, onDelete }) {
  const { modoOscuro } = useTheme();
  
  return (
    <li className={`lista-item ${modoOscuro ? 'dark' : 'light'}`}>
      <span>{item}</span>
      <button className="delete-btn" onClick={onDelete}>
        Eliminar
      </button>
      
      <style jsx>{`
        .lista-item {
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
          animation: fadeIn 0.3s;
        }
        
        .lista-item.light {
          background-color: #f5f5f5;
          border: 1px solid #eee;
        }
        
        .lista-item.dark {
          background-color: #333;
          border: 1px solid #444;
        }
        
        .lista-item:hover {
          transform: translateX(5px);
        }
        
        .delete-btn {
          background-color: #ff5252;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        
        .delete-btn:hover {
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </li>
  );
}

export default ListaItem;