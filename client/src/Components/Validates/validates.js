

function validate(values){
    let error = {};

      if(!values.name){
      error.name= 'Name is required';
      }
      if (!values.heightMin) {
        error.heightMin = "Please, enter the minimum height";
      }
      if (values.heightMin < 0){
        error.heightMin = "Invalid height";
      }
      if (values.heightMin && values.heightMax && parseInt(values.heightMin) >= parseInt(values.heightMax)) {
        error.height = "The maximum height must be greater than the minimum height";
      }
      if (!values.heightMax) {
        error.heightMax = "Please, enter the maximum height";
      } 
      if (!values.weightMin || values.weightMin < 0) {
        error.weightMin = "Please, enter the minimum weight";
      } 
      if (values.weightMin && values.weightMax && parseInt(values.weightMin) >= parseInt(values.weightMax)) {
        error.weight = "The maximum weight must be greater than the minimum weight";
      }
      if (!values.weightMax) {
        error.weightMax = "Please, enter the maximum weight";
      }
  
    return error
  }

  
  export default validate;