function convertToRoman(num) {

  const romanRef =  [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let romanNum = "";
  let v = 0;

  for (let i = 0; i<romanRef.length; i++) {

  v = (num - num%romanRef[i][0]);

  if (v != 0) {
    num = (num%romanRef[i][0]);
    console.log(num);
  }

  for (let c = (v/romanRef[i][0]); c>0; c--) {
    romanNum += romanRef[i][1];
  }
  }
  return romanNum;
}