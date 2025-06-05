import{conmysql} from '../bd.js'
export const getAccesosxid=async(req,res)=>{
   // res.send(' cliente x id')
    try {
       // const miID=[req.params.id];
         const [result]= await conmysql.query(' select * from accesos where per_id=? ',[req.params.id])
         if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message:" Accesos no encontrado"
         })
         res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message:" error en el servidor"})
    }
    }