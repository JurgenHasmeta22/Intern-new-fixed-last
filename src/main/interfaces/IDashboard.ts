import { TProduct } from "./TProduct"
import ICategory from "../interfaces/ICategory"
import ICurrency from "../interfaces/ICurrency"

export default interface IDashboard
{
	products: TProduct[]
	productItem: TProduct | null
	categories: ICategory[] | undefined
	currencies: ICurrency[] | undefined
	categorySelected: string
} 