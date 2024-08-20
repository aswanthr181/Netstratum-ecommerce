import { Line } from "react-chartjs-2";
import { LinearScale } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import { TooltipItem } from "chart.js";
Chart.register(LinearScale);
import { ProductType } from "../../Types/allType";
interface LineChartProps {
    products: ProductType[];
    lineOption:string
  }
function LineChart({ products, lineOption }:LineChartProps) {
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
                type: "category" as const,
                title: {
                    display: true,
                },
            },
        },
        elements: {
            line: {
                tension: 0.1,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem:TooltipItem<"line">) {
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
