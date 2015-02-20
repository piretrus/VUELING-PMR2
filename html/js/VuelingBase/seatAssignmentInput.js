/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*
    This file has beed deprecated
    The seat assignment javascript is in unitMap.js  
*/

//GLOBAL VARIABLES ARE DEFINED IN THE XSLT FILE FOR THIS CONTROL.		
		// =========== CONTROL PAX AND SEG DISPLAY ===========

	function HighlightSegPaxBox (newElmtName)
	{

		if(!document.getElementById || !document.createTextNode)
			return true;

		var d	= document;
		var ds	= document['SkySales'];
		var oldArr, oldSeg, oldPax;
		var newArr, newSeg, newPax;

		if (oldElmtName != null)
		{
			oldArr		= oldElmtName.split('|'); 
			oldSeg		= oldArr[0];
			oldPax		= oldArr[1];
		}

		newArr		= newElmtName.split('|'); 
		newSeg		= newArr[0];
		newPax		= newArr[1];

		if (newSeg == "")
		{
			newSeg = _ActiveSeg
		}

		if (newPax == "")
		{
			newPax = _ActivePax;
		}

		// If getElementById doesn't work across browsers,
		// maybe we put seg and pax names in invisible text
		// boxes, then document['SkySales'][oldPax].className

		if (oldElmtName != null)
		{
			ds[oldSeg + "|" + oldPax].className	= "inputOff";
			d.getElementById(oldPax).className	= "paxOff";
			d.getElementById(oldSeg).className	= "segOff";
			d.images[oldPax + "Icon"].src		= PaxIconOff.src;
			d.images[oldSeg + "Icon"].src		= SegIconOff.src;
		}

        if (!ds[newSeg + "|" + newPax])
        {
		    return;
		}
		ds[newSeg + "|" + newPax].className	= "inputOn";
		d.getElementById(newPax).className	= "paxOn";
		d.getElementById(newSeg).className	= "segOn";	
		d.images[newPax + "Icon"].src		= PaxIconOn.src;
		d.images[newSeg + "Icon"].src		= SegIconOn.src;
		

		ds[newSeg + "|" + newPax].blur();	// don't let them edit the field

		oldElmtName = newSeg + "|" + newPax;

		// show new seat map if newSeg is different from ActiveSeg
		if ( _ActiveSeg != newSeg )
		{
		    _ActiveSeg = newSeg;
		    raise('SelectSeatSegment', new SelectSeatSegEventArgs(newSeg));
		}

		if ( _ActivePax != newPax )
		{
			_ActivePax=newPax;
			raise('SelectSeatPax', new SelectSeatPaxEventArgs(newPax));
		}
	}
	
	
	function findSeg(paxName)
	{	
		// Find the seg flown by this pax that doesn't have a seat yet.
		if (paxName != "")
		{
			for(var element in document['SkySales'].elements)
			{
				if (element.indexOf(paxName) > -1)
				{
					if (document['SkySales'][element].value == "")
					{
						return element.substring(0, element.indexOf("|"));
					}
				}
			}
		}
		return _ActiveSeg;	// stay put
	}

	function findPax(segName)
	{
		// Find the pax on this seg who doesn't have a seat assignment yet.
		if (segName != "")
		{
			for(var element in document['SkySales'].elements)
			{
				if (element.indexOf(segName) > -1)
				{
					if (document['SkySales'][element].value == "")
					{
						return element.substring(element.indexOf("|")+1, element.length);
					}
				}
			}
		}
		return _ActivePax;	// stay put
	}			
	
	function SeatAssignment_selectSeat(SelectSeatEventArgs)
	{
		document['SkySales'][SelectSeatEventArgs.segId+'|'+SelectSeatEventArgs.paxId].value = SelectSeatEventArgs.seat;
		HighlightSegPaxBox(SelectSeatEventArgs.segId+'|'+SelectSeatEventArgs.paxId);
	}