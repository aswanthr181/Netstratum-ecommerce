import { Chart } from "chart.js";
import { CategoryScale } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { ProductType } from "../../Types/allType";
Chart.register(CategoryScale)

interface Chart1Props {
    products: ProductType[];
  }
function Chart1({ products }:Chart1Props) {
    console.log(products[0].title);

    const groupByCategoryAverage = (products: any) => {
        const groupByCategory = products.reduce((acc: any, product: ProductType) => {
            if (!acc[product.category]) {
                acc[product.category] = { totalRating: product.rating.rate, count: 1 }
            } else {
                acc[product.category].totalRating += product.rating.rate
                acc[product.category].count += 1
            }
            return acc
        }, {})

        return Object.keys(groupByCategory).map((category: string) => ({
            category,
            avgRating: groupByCategory[category].totalRating / groupByCategory[category].count
        }))
    }
    const avgRating = groupByCategoryAverage(products)

    const minRating = Math.min(...avgRating.map(item => item.avgRating));
    const yAxisMin = Math.floor(minRating) - 0.1

    const data2 = {
        labels: avgRating.map(item => item.category),
        datasets: [
            {
                label: 'Average Rating',
                data: avgRating.map(item => item.avgRating),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options2 = {
        scales: {
            y: {
                beginAtZero: false,
                min:yAxisMin
            },
        },
    };

    return (
        <div className="">
            <Bar data={data2} options={options2} />
        </div>
    )

}
export default Chart1