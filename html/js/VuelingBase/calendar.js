	
		var currentMonth = 0; // just start somewhere
		var currentYear = 2000; // just start somewhere 
		var lockdown = new Date(); //set today as lockdown day
		var daysInMonthArray = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var monthNames = cultureMonths;
		var passedInfo = '';
				
		function leap_year(month, year)
		{
			if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)))
			{
				return 1;
			}
			return 0;
		}
		
		function get_days_in_month(month, year)
		{
			return daysInMonthArray[month] + leap_year(month, year);
		}
		
		function load_month(month, year)
		{	
			var ds = document['SkySales'];
			if (ds == null)
			{
			    document['SkySales'] = document.forms['SkySales'];
			    ds = document['SkySales'];
			}
			
			//fix the current month
			if (month == -1)
			{
				month = 11;
				year--;
			}
			if (month == 12)
			{
				month = 0;
				year++;
			}
			
			// validate this is a possible month
			if ((month < 0) || (month > 11))
			{
				return alert("Illegal month selected.");
			}
				
			//get the first day
			var firstDayInMonth = new Date(year, month, 1);
			
			//set the month
			ds['month'].value = monthNames[month] + ' ' + firstDayInMonth.getFullYear();
			
			//find the first day offset
			var offset = firstDayInMonth.getDay();
			var offsetDaysInMonth = get_days_in_month(month, year) + offset;
			
      //Remove the back button for the current month/year.
      if ( (month == lockdown.getMonth() ) && ( year == lockdown.getFullYear() ) )
      {
        document.getElementById("prev").style.display = 'none';
      }else{
        document.getElementById("prev").style.display = 'inline';
      }
      
			for(var i = 0; i < 42; i++)
			{
				if ((i >= offset) && (i < offsetDaysInMonth))
				{
					var dayNumber = (i - offset) + 1;
          
					if ((year < lockdown.getYear()) ||
						((year == lockdown.getFullYear()) && (month < lockdown.getMonth())) ||
						((year == lockdown.getFullYear()) && (month == lockdown.getMonth()) && (dayNumber < lockdown.getDate()))
					   )
					{
						ds['c' + i].className = 'thisMonthUnavailable';
					}
					else
					{ 
						
            //Reset today highlighting before we set it below.
            if ( ds['c' + i].parentNode.className == 'today')
            {
              ds['c' + i].parentNode.className = 'thisMonth';
            }
            
            if ( (dayNumber == lockdown.getDate()) && (month == lockdown.getMonth()) && (year == lockdown.getFullYear()) )
            {
              ds['c' + i].parentNode.className = 'today';
            }else{                
              ds['c' + i].className = 'thisMonth';
					  }
          }
					ds['c' + i].value = dayNumber;
				}
				else
				{
					ds['c' + i].className = 'otherMonth';
					ds['c' + i].value = '  ';
				}
			}

			currentMonth = month;
			currentYear = year;
		}
		
		function selected(obj)
		{
		    var day = "";
		    var month = "";
		    var year = "";
		    var whichMkt = "";
		    
		    if (obj != null)
		    {
		        var ds = document['SkySales'];
		        var objValue = obj.value;
		        var objId = obj.id;
		        if (objValue.indexOf(datePickerDelimiter) > -1)
		        {
		            var datePickerArray = objValue.split(datePickerDelimiter);
    		        for (var i = 0; i < datePickerFormat.length; i++)
    		        {
    		            var dateData = datePickerArray[i];
    		            if (dateData.charAt(0) == '0')
    		            {
    		                dateData = dateData.substring(1);
    		            }
    		            var formatChar = datePickerFormat.charAt(i);
    		            switch(formatChar)
    		            {
    		                case 'm': month = dateData; break;
    		                case 'd': day = dateData; break;
    		                case 'y': year = dateData; break;
    		            }
    		        }
    		        whichMkt = parseInt(objId.substring(objId.length - 1));
    		        month = parseInt(month);
    		        month = monthNames[--month];
		        }
		        else if ((obj.value > 0) && (obj.value < 32))
		        {
		            //Get month and year from input box on calendar and split it.
		            var selectedDate = new Array();
                    selectedDate = ds['month'].value.split(' ');
                    day = obj.value;
                    year = selectedDate[1];
                    month = selectedDate[0];
                    whichMkt = document.getElementById("calMkt").value;
		        }
                
                //Get the day and month controls to update. whichMkt is hidden field in form.
                var dropDownListMarketDay = applicationJavaScriptHtmlId + '_DropDownListMarketDay' + whichMkt;
                var dropDownListMarketMonth = applicationJavaScriptHtmlId + '_DropDownListMarketMonth' + whichMkt;         
                
                //Get the index number of the month selected, start at -2 so you don't just return 0 or Jan.
                var x = 0;
                var monthIndex = -2;
                for(x=0; x< monthNames.length; x++)
			    {
                  if ( monthNames[x] == month )
                  {
                    monthIndex = x;
                    break;
                  }
                }     
        
                //Since array starts at 0 add one and then send it to the padding function for 02 instead of 2.
                monthIndex++;        
                monthIndex = pad( monthIndex,2);
                
                dayIndex = day;
                dayIndex = pad(dayIndex, 2);
                
                ds[dropDownListMarketDay].value = '' + dayIndex;
                ds[dropDownListMarketMonth].value = year + '-' + monthIndex;

                var divShimObj = document.getElementById("DivShim");
                if (divShimObj != null)
                {
                    divShimObj.style.display = 'none';
                }
                var calendarLayerObj = document.getElementById("calendarLayer");
                if (calendarLayerObj != null)
                {
                    calendarLayerObj.style.display = 'none';
                }
		    }
		}

    function pad(number,length) {
        var str = "" + number;
        while (str.length < length)
          str = '0' + str;
        return str;
    }    
    
		function highlight(obj)
		{
			if(obj.className == 'thisMonthUnavailable')
			{
				obj.className = 'highlightDayUnavailable';
			}
			else if(obj.className == 'thisMonth')
			{
				obj.className = 'highlightDay';
			}
			else if(obj.className == 'prevNextMonthLinks')
			{
				obj.className = 'highlightPrevNextMonthLinks';
			}
		}
		
		function lowlight(obj)
		{
			if(obj.className == 'highlightDayUnavailable')
			{
				obj.className = 'thisMonthUnavailable';
			}
			else if(obj.className == 'highlightDay')
			{
				obj.className = 'thisMonth';
			}
			else if(obj.className == 'highlightPrevNextMonthLinks')
			{
				obj.className = 'prevNextMonthLinks';
			}
		}
    
    function openClose( div )
    {
      if ( document.getElementById )
      {
        document.getElementById(div).style.display = 'none'; 
        document.getElementById("DivShim").style.display = 'none';
      }
    }
    
