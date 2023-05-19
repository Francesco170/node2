//il mio è un file .js invece di .ts perchè .ts mi dava problemi 




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







const getAll= (req,res)=> {
    res.status(200).json(planets);
}

const getOneById= (req,res)=> {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id))
     res.status(200).json(planet);
 }
const create =(req,res)=>{
    const {id, name} = req.body;
    const newPlanet = {id ,name};
    planets= [...planets, newPlanet];
  
    console.log(planets);
  
    res.status(201).json({msg:"the planet was created"});
  }
const updateById=(req,res)=> {
    const { id } = req.params;
    const{name} = req.body
    planets = planets.map(p => p.id === Number(id) ? ({...p,name}) :p )
    console.log(planets)
  
    res.status(200).json({ msg: "the planet was updated"})
  }
const deleteById=(req,res)=> {
    const {id} = req.params;
    planets = planets.filter((p) => p.id !== Number(id));
      console.log(planets)
    res.status(200).json({msg:"thee planet was deleted"});
  }

  export {getAll,getOneById,create,updateById,deleteById};