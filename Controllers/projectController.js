const projects= require("../Model/projectSchema")




exports.addProject = async (req, res) => {
  const userId = req.payload;
  console.log("Inside add project controller")
  // requrst we are getting is form data 
  // so it is not possiblkew to directly access the data 
  // we need to use multer module to deal with multipart/form-data.
  // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
  const projectImage= req.file.filename
  console.log("image name",projectImage);
  const{title,language,github,website,overview}=req.body
  try {
    const existingProject= await projects.findOne({github:github})
    if(existingProject){
      res.status(409).json("Project already exist")
    }else{
      const newProject = new projects({
        title,language,github,website,overview,projectImage,userId,
      })
      await newProject.save()
      res.status(200).json("project upload successfully")
    }
  } catch (error) {
    res.status(401).json("project upload failed.",error)
  }
}
  // 1) get any 3 project details for home page
  exports.getHomeProject = async(req,res)=>{
    try{
      const homeProject = await projects.find().limit(3);
      console.log(homeProject);
      
      res.status(200).json(
        {homeProject})
    }catch(err){
      res.status(401).json("Request failed due to:", err)
    }
  }
  // 2) get all projects
  exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search;
    console.log(searchKey);
    const searchQuery= {
      // language:{
      //   $regex:searchKey,$options:'i'   //Case-insensitive search for language
      // }
      $or: [
        {language:{
            $regex:searchKey,$options:'i'   //Case-insensitive search for language
          }
        },
        {title:{
            $regex:searchKey,$options:'i'   //Case-insensitive search for language
          }
        },
      ]
    }
    try{
      const allProject = await projects.find(searchQuery)
      res.status(200).json(allProject)
    }catch(err){
      res.status(401).json("Request failed due to:", err)
    }
  }
  // 3) get all projects uploaded by the specific user
  exports.getUserProject = async(req,res)=>{
    userId=req.payload;
    try{
      const userProject = await projects.find({userId:userId})
      res.status(200).json(userProject)
    }catch(err){
      res.status(401).json("Request failed due to:", err)
    }
  }

  exports.editUserProject = async (req,res)=>{
    const {id}= req.params;
    const userId=req.payload;
    const {title,language,github,website,overview,projectImage} = req.body;
    const uploadedProjectImage = req.file?req.file.filename:projectImage;
    try{
      const updateProject = await projects.findByIdAndUpdate(
        {id:_id},{
          title:title,
          language:language,
          github:github,
          website:website,
          overview:overview,
          projectImage:uploadedProjectImage,
          userId:userId
        },
      {new:true,}
      );
      await updateProject.save();
      res.status(200).json("updateProject successful")
    }catch(error){
      res.status(401).json(error)
    }
  }

  exports.deleteUserProject = async (req,res)=>{
    console.log("inside delete controller");

    const {id}= req.params
    try{
      const removeProject= await projects.findByIdAndDelete({_id:id})
      res.status(200).json(removeProject)

    }catch(err){
      res.status(401).json(err)
    }
    
  }