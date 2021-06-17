My Weather App

I started this project by building my HTML by using Bootstraps container and card functions, and adding all of my placeholders for the 6 cards in whole that I am using to populate the users request. This was done while also building the input section with my search button and clear button. Also I need to link all of the scripts I am using, Bootstrap, Font Awesome, JQuery and moment.js. As well my style.css and script.js. I will say I found it frustrating that I was unable to find a matching icon for the clear button that would fit the style of the search button.

My first JS function is to populate the input data and send it back to the user in a more polished form. I take the cityList from the input section and split it that way I can populate the info in capital letters for the populated sections for more of a polished look. Alone this does nothing for me but it will tie the whole process together for a more polished look later.

Next, I built the button functions. Even though they are not able to pull any info because I have not added my API's yet I wanted to make sure that I have the button function ready. As well I wanted to make sure that my cards were hidden when the user has not put data in yet, and that when they put data in the cards would populate with the users request. Also I need to get the data to local storage/ when they use the clear button. Clear that data from local storage.

Then, I started on the main part of the assignment, I did some digging as to how other weather apps worked. I started by finding my API's and put them in. I did not know exactly how to use them. So I had to do some research on how to use weather API's. What I found was I needed to use the longitude and latitude function on JS. I need to close that with an ajax function from JQuery to get the data from the API's

After that, I needed to set my weather function. This is going to include date and and time so that the data populates todays info and the next 5 days data properly. Then I need to get weather and city functiontied to Temp, Humidity and wind speed. I also have to define longitude and latitude by tying them to the weather function and coordinates. I originally tried to have the UV index in this section as well. But that wouldn't work. So I had to do some more research. 

I found that the UV function had to be nested after the others, because the API's could not pull that data. So I had to find another API for that. The function pulls data for current day UV because the API cannot predict the future UV. Once I thought of that it all made sense. So I finished the UV function and I tied it to current day.

Then I need to set the forecast date and position function. I am also telling the script from above where to populate and what icons to use next to the data retreived. 

Last I did very minimal CSS because I used Bootstrap and Font Awesome to do most of my styling and container/cards for me. 