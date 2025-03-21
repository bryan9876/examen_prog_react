import React, { useEffect, useState } from 'react';
import './Header.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Header = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showChart, setShowChart] = useState(false); // Estado para controlar la visualización de la gráfica

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error al obtener los productos:', error));
    }, []);

    // Filtra los productos según el término de búsqueda
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cuenta la cantidad de productos por categoría
    const categoryCount = Object.entries(
        filteredProducts.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {})
    ).map(([category, count]) => ({ category, count }));

    return (
        <div className='content'>
            <div className='header'>
                <h1 className='title-product'>Productos</h1>
                <button 
                    className='button' 
                    onClick={() => setShowChart(!showChart)} // Toggle para mostrar u ocultar la gráfica
                >
                    <i className="bi bi-reception-4"></i> {showChart ? 'Ocultar Gráfica' : 'Ver Gráfica'}
                </button>
            </div>

            {/* Input para buscar por nombre o categoría */}
            <input 
                type="text" 
                className='input-filtro' 
                placeholder='Buscar por nombre o categoría' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Mostrar la tabla de productos filtrados */}
            <table className="product-table">
                <thead className="table-head">
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mostrar la gráfica si showChart es verdadero */}
            {showChart && (
                <>
                    <h2 className="titulo-grafica">Grafica de productos</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryCount}>
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#0f47ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default Header;
