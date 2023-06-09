import fs from "fs-extra"
import path  from "path"

export function cp(src:string, dest:string, arr:Array<string>, name?:string){
  // Create destination directory if it doesn't exist
  fs.ensureDirSync(dest);

  // Get a list of all files and directories in the source directory
  const files = fs.readdirSync(src);

  // Iterate through each file/directory
  files.forEach((file: string) => {
    
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // Check if the current item is the 'node_modules' directory
    let flag=true;
    arr!=null && arr.forEach((item, index) => {
      
      if (item === file) {
        //console.log(`Skipping 'node_modules' directory: ${srcPath}`);
        flag=false;
      }
    })
    if(!flag)return;// Skip to the next iteration
    // Check if the current item is a file or a directory
    if (fs.statSync(srcPath).isDirectory()) {
      // Recursively copy subdirectories
      cp(srcPath, destPath,arr);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
      //console.log(`Copied file: ${srcPath}`);
    }
  });
  //console.log(`Finished copying: ${src}`);
}