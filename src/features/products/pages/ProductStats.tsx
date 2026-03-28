import {useSelector} from "react-redux";
import {Card,CardContent} from "@/components/ui/card";

export default function productStats(){
    const {products}=useSelector ((state:any)=>state.products);
    const totalStock=products.reduce((a:number,p:any)=>a+p.stock,0);
return(
    <div className="grid grid-cols-3 gap-4">
<Card>
    <CardContent className="p-4"> 

<p>Total Products</p>
<h2 className="text-3xl font-bold">{products.length}</h2>
         </CardContent> 
</Card>

<Card>
    <CardContent className="p-4"> 

<p>Total Stock</p>
<h2 className="text-3xl font-bold">{totalStock}</h2>
         </CardContent> 
</Card>
    </div>

)
}