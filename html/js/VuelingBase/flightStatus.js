/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

function getStationArray (stationKey)
{
    stationKey = stationKey.toLowerCase();
    var stationArray = stationKey.split('_');
    return stationArray;
}

function drawLegs (stationKey, currentLeg)
{
    //alert(" stationKey " + stationKey + " currentLeg " + currentLeg);
    //<line id="path" x1="0" y1="0" x2="0" y2="0" style="stroke:blue; stroke-width:.8" />
    /*
    var svg = document.getElementById('flightStatusImageId').ownerDocument;
    
    var stationArray = getStationArray(stationKey);
    for (var i = 0; i < (stationArray.length - 1); i++)
    {
        var stationOne = document.getElementById(stationArray[i]);
        var stationTwo = document.getElementById(stationArray[i + 1]);
        
        var node = document.createElement("line");
        var theText = document.createTextNode("[------- SELECT ITEM -------]");
        node.appendChild(theText);
        var id = 'leg_' + i;
        node.setAttribute('id', id);
        node.setAttribute('x1', stationOne.getAttribute("cx"));
        node.setAttribute('y1', stationOne.getAttribute("cy"));
        node.setAttribute('x2', stationTwo.getAttribute("cx"));
        node.setAttribute('y2', stationTwo.getAttribute("cy"));
        node.setAttribute('stroke','blue');
        node.setAttribute('stroke-width','.8');
        
        var flightPath = document.getElementById('flightPath');
        //flightPath.innerHTML = '<line id="path" x1="50" y1="50" x2="100" y2="100" style="stroke:blue; stroke-width:.8" />';
        flightPath.appendChild(node);
        //alert(node);
        alert(flightPath.innerHTML);
        alert(document.getElementById('leg_0'));
        
    }
    */
}

var cityArray = new Array();

function addCityText (relativeToId, textNodeId)
{
    cityArray.push(relativeToId);
    cityArray.push(textNodeId);
}

function citiesLoaded ()
{
    for (var i = 0; i < cityArray.length; i = i + 2)
    {
        positionCityText(cityArray[i], cityArray[i + 1]);
    }
}

function positionCityText (relativeToId, textNodeId)
{   
    if (textNodeId == '')
    {
        textNodeId = relativeToId + "Text";
    }
    var showOtherCities = document.getElementById('showOtherCities').getAttribute('name').toLowerCase();
    var textNode = document.getElementById(textNodeId);
    var relativeTo = document.getElementById(relativeToId);
    var stationKey = document.getElementById("stationKey");
    var stationName = stationKey.getAttribute("name").toLowerCase();
    var re = eval('/(^|_)' + relativeToId + '(_|$)/');
	if (re.test(stationName))
	{
	    // This City Is in the flight Path
        if ( (relativeTo.getAttribute("excludeCityList") != null) && (relativeTo.getAttribute("excludeCityList") != "") )
        {
            var excludeCityArray = relativeTo.getAttribute("excludeCityList").split(',');
            for (var i = 0; i < excludeCityArray.length; i++)
            {
                // make sure the exclude city is not in the flight path before you exclude it
                var re = eval('/(^|_)' + excludeCityArray[i] + '(_|$)/');
	            if (!(re.test(stationName)))
                {
                    var excludeRelativeTo = document.getElementById(excludeCityArray[i]);
                    var excludeTextNode = document.getElementById(excludeCityArray[i] + 'Text');
                    if (excludeRelativeTo)
                    {
                        excludeRelativeTo.setAttribute("style", "visibility: hidden;");
                    }
                    if (excludeTextNode)
                    {
                        excludeTextNode.setAttribute("style", "visibility: hidden;");
                    }
                }
            }
        }
        
        textNode.setAttribute("style", "font-size: 8pt;");
        relativeTo.setAttribute("style", "fill: blue;");
        relativeTo.setAttribute("r", "1.5");
        
    }
    else if (showOtherCities == "false")
    {
        textNode.setAttribute("style", "visibility: hidden;");
        relativeTo.setAttribute("style", "visibility: hidden;");
    }
    else
    {
        if ( (relativeTo.getAttribute("style") == null) || (relativeTo.getAttribute("style") == "") )
        {
            var defaultCityStyle = document.getElementById('defaultCity').getAttribute("style");
            relativeTo.setAttribute("style", defaultCityStyle);
        }
        if ( (textNode.getAttribute("style") == null) || (textNode.getAttribute("style") == "") )
        {
            var defaultCityTextStyle = document.getElementById('defaultCityText').getAttribute("style");
            textNode.setAttribute("style", defaultCityTextStyle);
        }
        if ( (relativeTo.getAttribute("otherCityPriority") == null) || (relativeTo.getAttribute("style") == "") )
        {
            var defaultCityOtherCityPriority = document.getElementById('defaultCity').getAttribute("otherCityPriority");
            relativeTo.setAttribute("otherCityPriority", defaultCityOtherCityPriority)
        }
        var defaultCityThreshold = document.getElementById('defaultCity').getAttribute("otherCityThreshold");
        if ( parseInt(defaultCityThreshold) < parseInt(relativeTo.getAttribute("otherCityPriority")) )
        {
            textNode.setAttribute("style", "visibility: hidden;");
            relativeTo.setAttribute("style", "visibility: hidden;");
        }
    }
    
    textNode.setAttribute("x", relativeTo.getAttribute("cx"));
    textNode.setAttribute("y", relativeTo.getAttribute("cy"));
    
    var cityText = new CityText(textNode);
    cityText.moveText();
}

function CityText(textNode)
{
    this.textNode = textNode;
    this.x = textNode.getAttribute('x');
    this.y = textNode.getAttribute('y');
    this.stringLength;
    this.endX;
    this.endY;
    this.errorCount = 0;
    this.svgImage  = document.getElementById('flightStatusImageId');
    this.svgImageWidth = this.svgImage.getAttribute('width');
    this.svgImageHeight = this.svgImage.getAttribute('height');
    this.midX = 0;
    
    this.moveText = function ()
    {
       if (this.errorCount == 0)
       {    
            this.alignCenter();
            // place the city name relative to the city
            this.placeRelativeToCity();
            this.nudgeIntoPlace();
       }
       else
       {
            this.handelError();
       }
    }
    
    this.alignCenter = function ()
    {
        this.midX = ( this.getStringLength() / 2 );
        this.setX((this.getX() - this.midX));
        this.textNode.setAttribute("x", (this.getX()));
    }
    
    this.nudgeIntoPlace = function ()
    {
        // Adjust for long city names, or cities in the east
        while ((this.getEndX() + 165) >= this.svgImageWidth)
        {
            this.setX((this.getX() - 1));
            this.textNode.setAttribute("x", this.getX());
        }

        // Adjust for cities in the west
        while ((this.getX()) <= 1)
        {
            this.setX((this.getX() + 1));
            this.textNode.setAttribute("x", this.getX());
        }

        // Adjust for cities in the north
        while ((this.getY()) <= 10)
        {
            this.setY((this.getY() + 1));
            this.textNode.setAttribute("y", this.getY());
        }

        // Adjust for cities in the south
        while ((this.getY() + 165) >= this.svgImageHeight)
        {
            this.setY((this.getY() - 1));
            this.textNode.setAttribute("y", this.getY());
        }
    }
    
    this.placeRelativeToCity = function()
    {
        var direction = 'top';
        if ((this.getY()) <= 10)
        {
            direction = 'bottom';
        }
        if (direction == 'bottom')
        {
            this.setY((this.getY() + 3));
        }
        else
        {
            // Default to top
            this.setY((this.getY() - 3));
        }
        this.textNode.setAttribute("y", this.getY());
    }
    
    this.setY = function (yIn)
    {
        this.y = yIn;
    }
    
    this.getY = function ()
    {
        return parseInt(this.y);
    }
    
    this.setX = function (xIn)
    {
        this.x = xIn;
    }
    
    this.getX = function ()
    {
        return parseInt(this.x);
    }
    
    this.getEndX = function ()
    {
        if (this.errorCount == 0)
        {
            this.endX = this.getX() + this.getStringLength();
            if (this.endX == this.getX())
            {
                this.handelError();
            }
            return this.endX;
        }
        this.handelError();
    }
    
    this.getY = function ()
    {
        return parseInt(this.y);
    }
    
    this.getStringLength = function ()
    {
        if (this.errorCount == 0)
        {
            if (this.stringLength == null)
            {
                this.stringLength = this.textNode.getComputedTextLength();
                if (this.stringLength == 0)
                {
                    this.handelError();
                }
            }
            return this.stringLength;
        }
        this.handelError();
    }
    
    this.handelError = function ()
    {
        if (this.errorCount == 0)
        {
            this.x = parseInt(this.x) - 20;
            textNode.setAttribute('x', this.x);
        }
        this.errorCount++;
    }
}

function calculatePosition (objectId, rotateId, currentLeg, percentageComplete)
{
    var flightPath = new FlightPath(objectId, rotateId, currentLeg, percentageComplete);
    flightPath.moveToCurrentPosition();
    flightPath.moveToCurrentRotation();
}

function FlightPath (objectId, rotateId, currentLeg, percentageComplete)
{
    this.objectId = objectId;
    this.object = document.getElementById(objectId);
    this.rotateId = rotateId;
    this.rotate = document.getElementById(rotateId);
    this.currentLeg = currentLeg.toLowerCase();
    this.currentLegArray = this.currentLeg.split('_');
    this.origin = document.getElementById(this.currentLegArray[0]);
    this.destination = document.getElementById(this.currentLegArray[1]);
    this.originX = parseInt(this.origin.getAttribute('cx'));
    this.originY = parseInt(this.origin.getAttribute('cy'));
    this.destinationX = parseInt(this.destination.getAttribute('cx'));
    this.destinationY = parseInt(this.destination.getAttribute('cy'));
    this.percentageComplete = percentageComplete;
    this.distance = null;
    this.distanceTraveled = null;
    this.slope = null;
    this.positionX = null;
    this.positionY = null;
    
    this.moveToCurrentPosition = function ()
    {
        var obj = this.getObject();
        obj.setAttributeNS(null, 'transform', 'translate(' + this.getPositionX() + ',' + this.getPositionY() + ')' );
    }
    
    this.moveToCurrentRotation = function ()
    {
        var dx = this.destinationX - this.originX;
        var dy = this.destinationY - this.originY;
        var angle = 0.0;
        if(dx < 0.0)
        {
            angle = Math.atan(this.getSlope()) + Math.PI;
        }
        else if(dy < 0.0)
        {
            angle = Math.atan(this.getSlope()) + (2 * Math.PI);
        }
        else
        {
            angle = Math.atan(this.getSlope());
        }
        var rotate_amount = (angle * 180) / Math.PI;
        rotate_amount = rotate_amount + 180;
        var rotate_string = 'rotate(' + ((rotate_amount)) + ')';
        this.rotate.setAttributeNS(null, 'transform',  rotate_string);
    }
    
    this.getCurrentPosition = function ()
    {
        if (this.percentageComplete > 0)
        {
            var currentDistance = 0;
            var currentX = this.originX;
            var currentY = this.originY;
            var cnt = 0;
            
            while(currentDistance <= this.getDistanceTraveled())
            {
                // b is the b in y = mx + b
                // where x and y is the point (x,y)
                // m = slope and b is the y intercept
                var b = currentY - (this.getSlope() * currentX);
                if (this.originX > this.destinationX)
                {
                    currentX = currentX - 1;
                }
                else
                {
                    currentX = currentX + 1;
                }
                currentY = (currentX * this.getSlope()) + b;
                currentDistance = Math.sqrt(Math.pow((currentX - this.originX),2) + Math.pow((currentY - this.originY),2));
                //setTimeout();
                //alert("CURRENT: " + currentDistance + " DISTANCE TRAVELED: " + this.getDistanceTraveled()); 
            }
            //alert('(' + currentX + ',' + currentY + ')');
            this.positionX = currentX;
            this.positionY = currentY;
        }
        else
        {
            this.positionX = this.originX;
            this.positionY = this.originY;
        }
    }
    
    this.getObject = function ()
    {
        if (this.object == null)
        {
            this.object = document.getElementById(objectId);
        }
        return this.object;
    }
    
    this.getRotate = function ()
    {
        if (this.rotate == null)
        {
            this.rotate = document.getElementById(rotateId);
        }
        return this.rotate;
    }
    
    this.getPositionX = function ()
    {
        if (this.percentageComplete <= 0)
        {
            this.positionX = this.destinationX;
        }
        return this.positionX;
    }
    
    this.getPositionY = function ()
    {
        if (this.percentageComplete <= 0)
        {
            this.positionY = this.destinationY;
        }
        return this.positionY;
    }
    
    this.getSlope = function ()
    {
        if (this.slope == null)
        {
            this.slope = ( (this.destinationY - this.originY) / (this.destinationX - this.originX) );
            //alert("Slope: " + this.slope);
        }
        return this.slope;
    }
    
    this.getDistance = function () 
    {
        if (this.distance == null)
        {
            this.distance = Math.sqrt(Math.pow((this.destinationX - this.originX),2) + Math.pow((this.destinationY - this.originY),2));
            //alert("Distance: " + this.distance);
        }
        return this.distance;
    }
    
    this.getDistanceTraveled = function ()
    {
        if (this.distanceTraveled == null)
        {
            //alert(this.percentageComplete);
            this.distanceTraveled = this.distance * (this.percentageComplete * .01);
            //alert("Distance Traveled: " + this.distanceTraveled);
        }
        return this.distanceTraveled;
    }
    
    this.setCurrentPosition = function (objectId, originX, originY, destinationX, destinationY, percentageComplete)
    {
        this.getDistance();
        this.getDistanceTraveled();
        this.getSlope();
        this.getCurrentPosition();
    }
    this.setCurrentPosition();
}
