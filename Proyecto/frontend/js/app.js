document.addEventListener('DOMContentLoaded', function() {
    // Obtener los productos desde el servidor
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.NAME}</td>
                    <td>${product.description || 'No disponible'}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                `;
                productList.appendChild(row);
            });

            // Configurar el gráfico con los productos
            const ctx = document.getElementById('inventoryChart').getContext('2d');
            const inventoryChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: products.map(product => product.NAME),
                    datasets: [{
                        label: 'Stock',
                        data: products.map(product => product.stock),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});
