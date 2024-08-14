// import { Line } from "react-chartjs-2";
// import { LinearScale} from "chart.js/auto";
// import { Chart } from "chart.js/auto";
// Chart.register(LinearScale);
// import { ProductType } from "../../Types/productType"

// function LineChart({ products,lineOption }) {
//     lineOption="PRODUCT PRICE"
//     const data = {
//         labels: products.map((product: ProductType) => `${product.id}`),
//         datasets: [
//             {
//                 label:"Product Price",
//                 data: products.map((product: ProductType) =>
//                     lineOption === "PRODUCT PRICE" ? product.price : product.rating
//                 ),
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 2,
//             }
//         ]
//     }
//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: false,
//                 title: {
//                     display: true,
//                     text: lineOption === "PRODUCT PRICE" ? "PRICE (INR)" : "RATING",
//                 },
//             },
//             x: {
//                 type: "category",
//                 title: {
//                     display: true,
                    
//                 },
//             },
//         },
//         elements: {
//             line: {
//                 tension: 1,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: top,
//                 position: "top",
//             },
        
//         tooltip: {
//             callbacks: {
//                 label: function (tooltipItem) {
//                     const product = products[tooltipItem.dataIndex];
//                     return `${product.title}: ₹${product.price}`;
//                 }
//             }
//         }
//     },
//     };
//     return (
//         <div>
//             <Line data={data} options={options}  />
//         </div>
//     )
// }

// export default LineChart

import { Line } from "react-chartjs-2";
import { LinearScale } from "chart.js/auto";
import { Chart } from "chart.js/auto";
Chart.register(LinearScale);
import { ProductType } from "../../Types/productType";

function LineChart({ products, lineOption }) {
    const data = {
        labels: products.map((product: ProductType) => `${product.id}`),
        datasets: [
            {
                label: lineOption === "PRODUCT PRICE" ? "Product Price" : "Product Rating",
                data: products.map((product: ProductType) =>
                    lineOption === "PRODUCT PRICE" ? product.price : product.rating.rate
                ),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: lineOption === "PRODUCT PRICE" ? "PRICE (INR)" : "RATING",
                },
            },
            x: {
                type: "category",
                title: {
                    display: true,
                },
            },
        },
        elements: {
            line: {
                tension: 1,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const product = products[tooltipItem.dataIndex];
                        return `${product.title}: ₹${product.price}`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default LineChart;
