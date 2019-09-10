// data collected from google form
let data = [
    {
        "timestamp": "2019-09-09T07:24:26.386Z",
        "excited": 3,
        "sleepy": 8,
        "hungry": 2,
        "anxious": 5,
        "lost": 7,
        "noFeelings": 4
    },
    {
        "timestamp": "2019-09-09T07:25:04.901Z",
        "excited": 4,
        "sleepy": 4,
        "hungry": 5,
        "anxious": 7,
        "lost": 7,
        "noFeelings": 4
    },
    {
        "timestamp": "2019-09-09T07:27:49.854Z",
        "excited": 4,
        "sleepy": 8,
        "hungry": 5,
        "anxious": 8,
        "lost": 8,
        "noFeelings": 2
    },
    {
        "timestamp": "2019-09-09T07:28:48.436Z",
        "excited": 5,
        "sleepy": 6,
        "hungry": 3,
        "anxious": 3,
        "lost": 2,
        "noFeelings": 1
    },
    {
        "timestamp": "2019-09-09T07:46:10.480Z",
        "excited": 4,
        "sleepy": 5,
        "hungry": 3,
        "anxious": 3,
        "lost": 7,
        "noFeelings": 1
    },
    {
        "timestamp": "2019-09-09T07:46:23.254Z",
        "excited": 8,
        "sleepy": 8,
        "hungry": 5,
        "anxious": 8,
        "lost": 8,
        "noFeelings": 1
    },
    {
        "timestamp": "2019-09-09T07:47:13.962Z",
        "excited": 5,
        "sleepy": 3,
        "hungry": 7,
        "anxious": 6,
        "lost": 6,
        "noFeelings": 2
    },
    {
        "timestamp": "2019-09-09T07:54:19.920Z",
        "excited": 6,
        "sleepy": 1,
        "hungry": 8,
        "anxious": 5,
        "lost": 5,
        "noFeelings": 4
    },
    {
        "timestamp": "2019-09-09T07:57:19.200Z",
        "excited": 4,
        "sleepy": 7,
        "hungry": 6,
        "anxious": 7,
        "lost": 7,
        "noFeelings": 2
    },
    {
        "timestamp": "2019-09-09T08:17:30.428Z",
        "excited": 4,
        "sleepy": 6,
        "hungry": 5,
        "anxious": 6,
        "lost": 6,
        "noFeelings": 1
    }
]

// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

let transformedData = averageData(data);

console.log(transformedData);

//Loop over transformedData
for(let i = 0; i < transformedData.length; i++){
  //get the item we deal with at this iteration
  let datapoint = transformedData[i];
  // get the name of the current item
  //and the average liking valie
  let feelings = datapoint.name;
  let average = datapoint.average;

  // create a div
  let bar = document.createElement("div");
  let barname = document.createElement("p");
  barname.innerHTML = feelings;

  // modify size (position, color, styling...) of div
  bar.className = "bar";
  bar.style.width = (average * 20) + "px";

  // append div to the page
  bar.appendChild(barname);
  document.body.appendChild(bar);

  console.log("i right now is" +  i);
  console.log(datapoint);
}
