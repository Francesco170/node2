//il mio è un file .js invece di .ts perchè .ts mi dava problemi 
import pgPromise from 'pg-promise';


const db= pgPromise()("postgres://postgres:agosto@localhost:5432/psql");

const setupDb = async () =>{
 await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
  );
`);

   await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
   await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

   
};

setupDb();

let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];







const getAll= async (req,res)=> {
    const planets = await db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
}

const getOneById= async (req,res)=> {
    const { id } = req.params;
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));

     res.status(200).json(planet);
 }
const create = async (req,res)=>{
    const { name} = req.body;
    const newPlanet = {name};
   await db.none(`INSERT INTO planets (name) VALUES ($1)`,name)
    res.status(201).json({msg:"the planet was created"});
  }
const updateById=async (req,res)=> {
    const { id } = req.params;
    const{name} = req.body
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`,[id,name])
   
  
    res.status(200).json({ msg: "the planet was updated"})
  }
const deleteById=async (req,res)=> {
    const {id} = req.params;
   await db.none(`DELETE FROM planets WHERE id=$1`,Number(id))
    res.status(200).json({msg:"thee planet was deleted"});
  }

  export {getAll,getOneById,create,updateById,deleteById};