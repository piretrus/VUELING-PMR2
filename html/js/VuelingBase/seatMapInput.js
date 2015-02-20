/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*
    This file has beed deprecated
    The seat map javascript is in unitMap.js  
*/

        var paxs			= new Array();
		var segs			= new Array();
		var paxSegs			= new Array();
		var paxNames		= new Array();
		var PaxesWithInfant = '|';
		segs['seg1']	    = new seg('seg1', '','','',''); 
						
		var ActiveSeg	    = segs["seg1"];
			            
	    paxSegs['pax1']		= new Array();
				
		paxSegs['pax1']['seg1']	= new paxSeg('seg1','');
				
		paxNames['pax1'] = new paxName("","","","","");
		paxs['pax1'] = new pax('pax1',formatName('pax1'));
				
		var ActivePax	    = paxs["pax1"];
		
		var Map		= new Array();
		var InfantAllowedSeatList		= new Array();

// SEAT MAP

		var ScrollPositions = new Array();

		var SeatSO		= new Image();	SeatSO.src		= "images/Base/seat-SO.gif";
		var SeatSB		= new Image();	SeatSB.src		= "images/Base/seat-SB.gif";
		var SeatSM		= new Image();	SeatSM.src		= "images/Base/seat-SM.gif";
		var SeatSA		= new Image();	SeatSA.src		= "images/Base/seat-SA.gif";
		var SeatSS		= new Image();	SeatSS.src		= "images/Base/seat-SS.gif"; 
		var SeatSF		= new Image();	SeatSF.src		= "images/Base/seat-SF.gif"; 
		var SeatSR		= new Image();	SeatSR.src		= "images/Base/seat-SR.gif"; 
		

		var SeatMO		= new Image();	SeatMO.src		= "images/Base/seat-SO.gif";
		var SeatMB		= new Image();	SeatMB.src		= "images/Base/seat-SB.gif";
		var SeatMM		= new Image();	SeatMM.src		= "images/Base/seat-SM.gif";
		var SeatMA		= new Image();	SeatMA.src		= "images/Base/seat-SA.gif";
		var SeatMS		= new Image();	SeatMS.src		= "images/Base/seat-SS.gif"; 

		var SeatLO		= new Image();	SeatLO.src		= "images/Base/seat-SO.gif";
		var SeatLB		= new Image();	SeatLB.src		= "images/Base/seat-SB.gif";
		var SeatLM		= new Image();	SeatLM.src		= "images/Base/seat-SM.gif";
		var SeatLA		= new Image();	SeatLA.src		= "images/Base/seat-SA.gif";
		var SeatLS		= new Image();	SeatLS.src		= "images/Base/seat-SS.gif";
		var SeatLF		= new Image();	SeatLF.src		= "images/Base/seat-SA.gif";
		 

// =========== SEAT STATUS LEGEND IMAGE PATHS ======
        var restrictedSeatImgSrc    = "images/Base/legend-restricted.gif"; 
        var fleetBlockedSeatImgSrc  = "images/Base/legend-blocked.gif";
        var bulkHeadImgSrc          = "images/Base/legend-bulkhead.gif";
        var emergencyExitImgSrc     = "images/Base/legend-exit.gif";
        var infantSeatImgSrc        = "images/Base/seatmap-legend-infant.gif";
        var smokingSeatImgSrc       = "images/Base/legend-smoking.gif";
        var lavatorySeatImgSrc      = "images/Base/seatmap-legend-lavatory.gif";
        var selectedSeatImgSrc      = "images/Base/seatmap-legend-assigned.gif";
        var availableSeatImgSrc     = "images/Base/seatmap-legend-available.gif";
        var occupiedSeatImgSrc      = "images/Base/legend-occupied.gif";
        var handicapSeatImgSrc      = "images/Base/seatmap-legend-disability.gif";
        var extraOxygenSeatImgSrc   = "images/Base/seatmap-legend-oxygen.gif"

// =========== SCROLLABLE DIV(S) METHODS ===========

		function ScrollPosition(scrollTop)
		{
			this.scrollTop = scrollTop;
		}


// =========== SEATMAP/PAX OBJECTS ===========


		function row(bits, startIndex, rowIndex)
		{
			this.number	= -1;
			this.IsHeader = false;
			
			
			var columnCount = -2; //Accounting for walls
			
			for (var i=startIndex; i<bits.length; i++)
			{
				if (this.number < 0 && bits[i].substring(0,1) == '|')
				{
					this.number = bits[i].substring(1);	
				}
				
				if (bits[i].indexOf(']') > -1)
				{
					break;
				}
				
				columnCount++;
				
				if (bits[i].indexOf('$') > -1)
					this.IsHeader = true;
			}
			this.ColumnCount = columnCount * 1;
			
			// There is no aisle seat - assign the rowindex instead
			if (this.number < 0)
				this.number	= rowIndex;

								
		}

		function wall(w)
		{
			var enu		= w.substring(1,2);
			var n		= enu;
			
			this.exit = false;	
			this.wing = false;
			
			if (n - 2 >= 0) { n -= 2;  this.wing = true; }
			if (n - 1 >= 0) { n -= 1;  this.exit = true; }
		}

		function Seat(s, r, c, seg)
		{
			this.seg        = seg;
			this.segNum     = seg.substring(seg.substring('seg').length-1, seg.length);
			this.size		= s.substring(0,1);	// C:oach, B:usiness, F:irst
			this.status		= s.substring(1,2); // O:ccupied, B:locked, M:issing, A:vailable, S:elected
			this.enumer		= s.substring(2,s.indexOf('('));
			this.seatGroup  = s.substring(s.indexOf(')')+1,s.length);
			this.src		= eval('Seat' + this.size + this.status + '.src');
			this.row		= r.number*1; 
			this.column		= c.substring(c.indexOf('(')+1,c.indexOf(')'));
			this.id			= this.row + this.column;
			this.paxId		= "pax1";
			this.className;	// TODO: set this to something by default?

			// parse enumeration
			this.exit	        = false;	
			this.lav	        = false;	
			this.inf	        = false;	
			this.smoke	        = false;
			this.disability     = false;
			this.extraLegRoom   = false;
			this.oxygen         = false;
			var n		= this.enumer;
			
			if (n - 64 >= 0) { n -= 64;  this.oxygen = true; }
			if (n - 32 >= 0) { n -= 32;  this.extraLegRoom = true; }
			if (n - 16 >= 0) { n -= 16;  this.disability = true; }
			if (n - 8 >= 0) { n -= 8;  this.smoke = true; }
			if (n - 4 >= 0) { n -= 4;  this.inf   = true; }
			if (n - 2 >= 0) { n -= 2;  this.lav   = true; }
			if (n - 1 >= 0) { n -= 1;  this.exit  = true; }

            this.title		= getSeatTitle(this);
		}

		function column(b)
		{
			this.letter	= b.substring(1);

			//if (!this.letter)
			//{
			//	if bulkhead isn't defined before seats in map, this will occur
			//}

		}

		function getSeatTitle(s)
		{
			var lineBreak = "<br/>";
	        var hintHtml = "<span class='seatMapHintHead'>" + seatInformationText + "</span> " + lineBreak;
	        hintHtml += "<span class='seatMapHintSectionHead'>" + seatNumberText + "</span> " + s.id + lineBreak;
	        hintHtml += "<span class='seatMapHintSectionHead'>" + seatStatusText + "</span> " + getSeatStatus(s);		    
		    	
			if(seatPrice[s.seg][s.seatGroup])
			{
			    if (s.status == 'A' || s.status == 'S')
			    {
				    hintHtml += lineBreak + "<span class='seatMapHintSectionHead'>"+ localizedTextSeatGroupCaption +localizedTextSeatGroupCaptionSeparator + "</span>" + s.seatGroup;
				    hintHtml += lineBreak + "<span class='seatMapHintSectionHead'>" + localizedTextSeatFeeCaption + "</span>" + localizedTextSeatGroupCaptionSeparator + seatPrice[s.seg][s.seatGroup];
			    } 
			}
			
			if (s.lav || s.inf || s.smoke || s.disability || s.extraLegRoom)
			{
			    hintHtml += lineBreak + lineBreak + "<span class='seatMapHintSectionHead'>" + amenitiesText + "</span>" + lineBreak;
			    
			    if (s.lav)
			    {
                    hintHtml +=  "<img src='images/Base/icon-lavatory.gif'/> " + localizedTextLavatorySignCaption + lineBreak;			        
			    }
			    
			    if (s.inf)
			    {
			        hintHtml +=  "<img src='images/Base/icon-infant.gif'/> " + localizedTextInfantSignCaption + lineBreak;
			    }
			    
			    if (s.smoke)
			    {
			        hintHtml +=  "<img src='images/Base/icon-smoking.gif'/> " + localizedTextSmokingSignCaption + lineBreak;
			    }    
			    
			    if (s.disability)
			    {
			        hintHtml +=  "<img src='images/Base/icon-disability.gif'/> " + localizedTextHandicapSignCaption + lineBreak;
			    } 
			   
			    if (s.oxygen)
			    {
			        hintHtml +=  "<img src='images/Base/icon-oxygen.gif'/> " + localizedTextExtraOxygenSignCaption + lineBreak;
			    } 
			    if (s.extraLegRoom)
			    {
			        hintHtml +=  " " + extraLegRoomCaption + lineBreak;
			    }   
			}
			
			return hintHtml;
		} // end getSeatTitle


// =========== SEATMAP METHODS ===========

		function pax(pId,n)
		{
			this.id		= pId;
			this.name	= n;
			this.segs	= paxSegs[pId];
		}

		function seg(sId,date,o,d,f)
		{
			this.id		                = sId;
			this.date	                = date;
			this.orig	                = o;
			this.dest	                = d;
			this.flt	                = f;
		}

		function paxSeg(segId, sId)
		{
		    if (Map)
		    {
			    if (Map[segId].seatMapAvailable)
			    {
				    this.seat	= Map[segId].seats[sId];
				}
			    else
			    {
				    this.seat = null;
				}
			}
			this.seatId = sId; // this is used to hold the initial seat assignment only
		}

		function paxName(title, first, middle, last, suffix)
		{
			this.title = title;
			this.first = first;
			this.middle = middle;
			this.last = last;
			this.suffix = suffix;
		}


	function seatMap(segId, rawMap, maxColumns)
	{
		this.segId		            = segId;
		this.html		            = "";					// html map (string containing html)
		this.columns	            = new Array(5);
		this.seats		            = new Array();
		this.bits		            = new Array();
		this.rows		            = new Array();
		this.maxColumns             = maxColumns;
		this.hasRestrictedSeats     = false;
	    this.hasBlockedSeats        = false;
	    this.hasFleetBlockedSeats   = false;
	    this.hasbulkHead            = false;
	    this.hasEmergencyExit       = false;
	    this.hasInfantSeat          = false;
	    this.hasSmokingSeat         = false;
	    this.hasHandicapSeat        = false;
	    this.hasExtraOxygenSeat     = false;
	    this.hasNearLavatorySeat    = false;
		
		if (rawMap == 'none')
			this.seatMapAvailable = false;
		else
			this.seatMapAvailable = true;
		this.rawMap = rawMap;
	}

	var maxCols = 0;
	function generateHTML(seatMap)
	{
	    
		if (seatMap.rawMap == 'none')
		{
			seatMap.seatMapAvailable = false;

			seatMap.html += "<span class='standard' style='width:100%; text-align:center; position:relative; top:160px;'>";
			seatMap.html += localizedTextNoSeatMap;
			seatMap.html += "</span>";
			return;
		}
		
		var wings		= false;
		var lWingRows	= -1;
		var rWingRows	= -1;
		var columnIx	= -1;
		var rowIx		= -1;
		var tempHtml	= ""
		var side		= "left";
		
		seatMap.bits		= seatMap.rawMap.split(',');	// bits & pieces of map (walls, seats, aisles, etc)

		maxCols = seatMap.maxColumns;
		
		// iterate through map bits
		for (var i = 1; i < seatMap.bits.length - 1; i++)
		{
			switch (seatMap.bits[i].substring(0,1))
			{
			    //the row has extra leg room
			    case '!' :
			        
			        tempHtml += "<tr height='13px'>";
			        tempHtml += "<td></td><td background='images/Base/wall-left.gif'><img src='images/Base/spacer.gif' width='8' height='1' /></td>"; 
					tempHtml += "<td bgcolor='#FFFFFF'>";
			        
			        
			        var blankRow = true;
			        while (blankRow)
			        {
			            i++;
			            
			            if (seatMap.bits[i].substring(0,1) == "|")
			            {
			                tempHtml += CreateAisle(-1, seatMap);
			            }
			            else if(seatMap.bits[i].substring(0,1) == "!")
			            {
			                blankRow = false;
			            }
			            
			        }
			        tempHtml += "</td>";
			        
			        tempHtml += "<td background='images/Base/wall-right.gif'>";
			        tempHtml += "<img src='images/Base/spacer.gif' width='8' height='1' /></td>";
			        tempHtml += "<td></td>";
			        tempHtml += "</tr>";
			        
			        break;
			  	case '[' :
					columnIx	= -1;
					rowIx++;
					side = "left";
					seatMap.rows[rowIx]		= new row(seatMap.bits, i, rowIx);	// New row.  Find row.
					
					var w		= new wall(seatMap.bits[i]);

					tempHtml += "<tr>";

					if (( w.wing ) && (lWingRows == -1))
					{
						lWingRows = seatMap.rawMap.match(/(\[2)|(\[3)/g).length;	// find rowspan on left wing
						lWingRows = lWingRows < 6 ? 6 : lWingRows;			// ensure rowspan >= 6

						//Should be safe to use maxCols by the time we reach the wings.
						var wingWidth = (360 - CalculateBodyWidth(maxCols)) / 2;
						
						tempHtml += "<td id='leftWingTd' rowspan='" + lWingRows + "' width='" + wingWidth + "px'>"
							  + "<div style='background-position:top right; background-image:url(images/Base/wing-front-left.gif); height:" + lWingRows*26/2 + "px;' ></div>"
							  + "<div style='background-position:bottom right; background-image:url(images/Base/wing-back-left.gif); height:" + lWingRows*26/2 + "px;'></div>"
							  + "</td>";
						wings = true;
					}

					if ( lWingRows <= 0 )
					{
						tempHtml += "<td></td>";
					}
					else
					{
						lWingRows -= 1;
					}

					if (w.exit)
					{
						tempHtml += "<td background='images/Base/wall-left-exit.gif'>"
							  + "<div style='width:8; height:26; background-image:url(images/Base/exit-arrow-left.gif); position: relative; right:15px;' />";
						seatMap.hasEmergencyExit = true;	
					}
					else
					{
						tempHtml += "<td background='images/Base/wall-left.gif'>";
					}	

					tempHtml += "<img src='images/Base/spacer.gif' width='8' height='1' /></td>"; 
					
					//Open 1st cell
					
					
					tempHtml += "<td bgcolor='#FFFFFF'>";
					//opening 1st cell

					break;


				// right wall
				case ']' :	
					var w = new wall(seatMap.bits[i]);
					
					tempHtml += "</td>"; //closing 3rd cell
					
					if (w.exit)
					{
						tempHtml += "<td id='rightWingTd' background='images/Base/wall-right-exit.gif'>"
							  + "<div style='width:8; height:26; background-image:url(images/Base/exit-arrow-right.gif); position: relative; left:15px;' />";
					}
					else
					{
						tempHtml += "<td background='images/Base/wall-right.gif'>";
					}	

					tempHtml += "<img src='images/Base/spacer.gif' width='8' height='1' /></td>";

					//alert (
					//		"\n w.wing: " 
					//		+ w.wing
					//		+ "\n rWingRows :"
					//		+ rWingRows
					//	);

					if (( w.wing ) && (rWingRows == -1))
					{
						rWingRows = seatMap.rawMap.match(/(\[2)|(\[3)/g).length;	// find rowspan on right wing
						rWingRows = rWingRows < 6 ? 6 : rWingRows;			// ensure rowspan >= 6
						
						
						var wingWidth = (340 - CalculateBodyWidth(maxCols)) / 2;

						
						tempHtml += "<td rowspan='" + rWingRows + "' width='"+wingWidth+"px'>"	// this width % number centers map in window!
							  + "<div style='background-position:top left; background-image:url(images/Base/wing-front-right.gif); height:" + rWingRows*26/2 + "px;' ></div>"
							  + "<div style='background-position:bottom left; background-image:url(images/Base/wing-back-right.gif); height:" + rWingRows*26/2 + "px;'></div>"
							  + "</td>";
						
						wings = true;
					}

					if ( rWingRows <= 0 )
					{
						tempHtml += "<td></td>";
					}
					else
					{
						rWingRows -= 1;
					}

					tempHtml += "</tr>";

                    
					break;

				// aisle
				case '|' :
					columnIx++;
					seatMap.columns[columnIx]	= new column(seatMap.bits[i]);
					
					tempHtml += CreateAisle(rowIx,seatMap);
					
					break;
				
				// bulkhead (separated from column letters)
				case '-' :
					columnIx++;
					seatMap.hasbulkHead = true;
					seatMap.columns[columnIx]	= new column(seatMap.bits[i]);

					//Calculate the div width for this seat:
					var seatWidth = (maxCols * 28) / seatMap.rows[rowIx].ColumnCount;
					var seatPadding = (seatWidth - 28) / 2;
					
					tempHtml += "<div style='height:27px;float:left;padding-left:"+ seatPadding +"px;padding-right:"+ seatPadding +"px'><img src='images/Base/bulkhead.gif'  border='0'>" 
						 + "</div>";

					break;

				// non-bulkhead first row (also defines column letters)
				case '$' :
					if (seatMap.bits[i].length == 1)
					{
						tempHtml += CreateAisle(rowIx,seatMap);
						break;
					}
						
					columnIx++;
					seatMap.columns[columnIx]	= new column(seatMap.bits[i]);

					//Calculate the div width for this seat:
					var seatWidth = (maxCols * 28) / seatMap.rows[rowIx].ColumnCount;
					
					tempHtml += "<div style=\"background-color:#FFFFFF;width:"+ seatWidth +";height:27;color:#333333; float:left; font-size:11px; font-family:Arial, Helvetica, Verdana; font-weight:bold; text-align:center; padding-top:10px;\">" 
							+ seatMap.columns[columnIx].letter + "</div>";

					break;

				// seat
				default :
					columnIx++;

					var bg		= "#FFFFFF";
					var s		= new Seat(seatMap.bits[i], seatMap.rows[rowIx], seatMap.bits[i], seatMap.segId);
                    
                    seatMap.seats[s.id]	= s;
					
					var sId		= s.id;

					if (seatMap.seats[s.id].exit)
						bg	= "#FFEEB8";
					
					if (seatColor && seatColor[seatMap.segId])
					{
					    if(seatColor[seatMap.segId][seatMap.seats[s.id].seatGroup] && seatMap.seats[s.id].status != 'M')
					    {
						    bg	= "#" + seatColor[seatMap.segId][seatMap.seats[s.id].seatGroup];
						    }
					}

					//Calculate the div width for this seat:
					var seatWidth = (maxCols * 28) / seatMap.rows[rowIx].ColumnCount;
					var seatPadding = (seatWidth - 28) / 2;
					
					tempHtml	+= "<div style=\"background-color:" + bg + ";float:left;padding-left:"+ seatPadding +"px;padding-right:"+ seatPadding +"px\">";
					
					if (seatMap.seats[s.id].status != 'M' && (seatMap.seats[s.id].inf || seatMap.seats[s.id].lav || seatMap.seats[s.id].smoke))
					{
						tempHtml += "<div style='position: absolute; width:" + seatWidth + "; z-index:1; text-align:right;' >";

						if (seatMap.seats[s.id].inf)
						{
							tempHtml += "<a href=\"javascript:assignSeat('" + s.id + "')\"><img src='images/Base/icon-infant.gif' class='infantIcon' onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" /></a>";
							seatMap.hasInfantSeat = true;
						}

						if (seatMap.seats[s.id].lav)
						{
							tempHtml += "<a href=\"javascript:assignSeat('" + s.id + "')\"><img src='images/Base/icon-lavatory.gif' class='lavatoryIcon' onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" /></a>";
							seatMap.hasNearLavatorySeat = true;
						}

						if (seatMap.seats[s.id].smoke)
						{
							tempHtml += "<a href=\"javascript:assignSeat('" + s.id + "')\"><img src='images/Base/icon-smoking.gif' class='smokingIcon'  onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" /></a>";
							seatMap.hasSmokingSeat = true;
						}
						
						if (seatMap.seats[s.id].oxygen)
						{
							tempHtml += "<a href=\"javascript:assignSeat('" + s.id + "')\"><img src='images/Base/icon-oxygen.gif' class='oxygenIcon'  onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" /></a>";
							seatMap.hasExtraOxygenSeat = true;
						}
						
						if (seatMap.seats[s.id].disability)
						{
							tempHtml += "<a href=\"javascript:assignSeat('" + s.id + "')\"><img src='images/Base/icon-disability.gif' class='handicapIcon'  onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" /></a>";
							seatMap.hasHandicapSeat = true;
						}
						
						tempHtml += "</div>";
					}

					if ((seatMap.seats[s.id].status == 'A')||(seatMap.seats[s.id].status == 'S'))
						tempHtml+= "<a href=\"javascript:assignSeat('" + s.id + "')\">";
						
					tempHtml	+= "<img name='" + s.id + "' id='" + s.id + "' src='" + seatMap.seats[s.id].src +"' ";
					
					if (seatMap.seats[s.id].status != 'M')
					{
					   tempHtml += "onmouseout='hideHint()' onmouseover=\"showSeatHint('"+s.id+"')\" ";
					}
					
					tempHtml += " border='0' />";

					if ((seatMap.seats[s.id].status == 'A')||(seatMap.seats[s.id].status == 'S'))
						tempHtml+= "</a>";
					
					tempHtml	+= "</div>";
					
					switch (seatMap.seats[s.id].status)
					{
					    case 'F':
					        seatMap.hasFleetBlockedSeats = true;
					        break;
					    case 'R':
					        seatMap.hasRestrictedSeats = true;
					        break;
					}

					break;
			}
			
			

		}

		if (!wings)
		{
			tempHtml += "<tr><td width='25%'></td>";
		}

		// Now that we know columns, widths, etc from map, prepend nose, concat tempHtml, and append tail, to seatMap.html.

		seatMap.html	+= "<div id='Map" + seatMap.segId + "' style='position: absolute; width: 375px; height:400; z-index:1; overflow:auto;'><table border='0' cellpadding='0' cellspacing='0'>";

		// do/don't show nose
		if (seatMap.bits[0] != 0)
		{
			var columnCount = maxCols
			columnCount++; //compensate for isle
			
			var elementWidth = 28;
			
			//if (maxCols < 6)
			//	elementWidth = 36;

			var colspan		= eval(columnCount + 2);
			var fuseWidth	= eval((columnCount * elementWidth) + (2 * 8));
			
			seatMap.html += "<tr><td></td>"
						+ "<td colspan='" + colspan + "' nowrap='true' style=\"position:relative; top:2px;\">"
						// + "<span style='background-position:top left; background-image:url(images/Base/nose-m-left.gif); width:" + fuseWidth/2 + "px; height:295;'></span>"
						// + "<span style='background-position:top right; background-image:url(images/Base/nose-m-right.gif); width:" + fuseWidth/2 + "px; height:295;'></span>"
						// TODO: If scaling works, and that's what we end up doing, why not just have a single, whole nose image (rather than left and right)?
						+ "<span><img src='images/Base/nose-left.gif' style='width:" + Math.floor(fuseWidth/2) + "px; height:" + Math.floor(fuseWidth/2*3) + "px;' /></span>"
						+ "<span><img src='images/Base/nose-right.gif' style='width:" + Math.floor(fuseWidth/2) + "px; height:" + Math.floor(fuseWidth/2*3) + "px;' /></span>"
						+ "</td><td></td></tr>";

		}

		// sandwich the tempHtml between nose/tail found in seatMap.html
		seatMap.html	+=	tempHtml;
		
		// do/don't show tail
		if (seatMap.bits[seatMap.bits.length - 1] != 0)
		{

			var colspan		= eval(columnCount + 2);
			var fuseWidth	= eval((columnCount * elementWidth) + (2 * 8));

			seatMap.html += "<tr><td></td>"
					   + "<td colspan='" + colspan + "' nowrap='true' style=\"position:relative; top:-1px;\">"
				//	   + "<span style='background-position:top left; background-image:url(images/Base/nose-m-left.gif); width:" + fuseWidth/2 + "px; height:295;'></span>"
				//	   + "<span style='background-position:top right; background-image:url(images/Base/nose-m-right.gif); width:" + fuseWidth/2 + "px; height:295;'></span>"
				//	   + "<span><img src='images/Base/tail-left-fade.gif' style='width:" + fuseWidth/2 + "px; height:" + fuseWidth*1.5 + "px;' /></span>"
				//	   + "<span><img src='images/Base/tail-right-fade.gif' style='width:" + fuseWidth/2 + "px; height:" + fuseWidth*1.5 + "px;' /></span>"
					   + "<span><img src='images/Base/tail-left-crop.gif' style='width:" + Math.floor(fuseWidth/2) + "px; height:" + Math.floor(fuseWidth/2*1.6) + "px;' /></span>"
					   + "<span><img src='images/Base/tail-right-crop.gif' style='width:" + Math.floor(fuseWidth/2) + "px; height:" + Math.floor(fuseWidth/2*1.6) + "px;' /></span>"
					   + "</td><td></td></tr>";
		}

		seatMap.html	+= "</table></div>";
		
	}

	function CreateAisle(rowIx,seatMap)
	{
		var tempHtml = '';
		
		tempHtml += "</td>";
		
		
		tempHtml += "<td background='images/Base/aisle.gif' style='width:28;' class='rowNumber' >" 
		
		if (rowIx > -1 && !seatMap.rows[rowIx].IsHeader)
		{
			tempHtml += seatMap.rows[rowIx].number;
		}
		
		tempHtml += "</td><td bgcolor='#FFFFFF'>";
		
		return tempHtml;
	}
	
	function CalculateBodyWidth(seatCols)
	{
		seatCols++;
		var elementWidth = 28;
		
		var planeBodyWidth	= eval((seatCols * elementWidth) + (2 * 8));
		
		return planeBodyWidth;
	}
	
	function AdjustWings()
	{
		//alert(leftWingTd);
		alert(bodyWidth);
		alert(rightWingTd.width);
		alert(leftWingTd.width);
		
			
		//leftWingTd.style.width =  15;
		rightWingTd.style.width = 50;
		
		
	}

	function GetSignCaption(signType)
	{
		switch (signType)
		{
			case "infants":
				return localizedTextInfantSignCaption;
			case "smoking":
				return localizedTextSmokingSignCaption;
			case "lavatory":
				return localizedTextLavatorySignCaption;
			
		}
		
	
	}
	function displaySeatMap(segId)
	{
		if(!document.getElementById || !document.createTextNode)
			return true;

		ActiveSeg	= segs[segId];

		// generate html for seat map if needed
		if (Map[ActiveSeg.id])
		{
		    if (Map[ActiveSeg.id].html == "")
		    {
			    // generate html for seg
			    generateHTML(Map[ActiveSeg.id]);
			    // create new paxSeg for seat occupied by passenger
			    for (var paxId in paxs)
			    {
				    var tempSeatId = paxSegs[paxId][ActiveSeg.id].seatId;
				    paxSegs[paxId][ActiveSeg.id] = new paxSeg(ActiveSeg.id, tempSeatId);
			    }
		    }
        
		    // display requested seat map
		    document.getElementById('map').innerHTML = Map[ActiveSeg.id].html;

		    if (Map[ActiveSeg.id].seatMapAvailable)
		    {
			    // populates seats already assigned to pax
			    populateBoxesAndSeats();
		    }
		}
	}

	function displayLegend(segId)
	{
	    if(!document.getElementById || !document.createTextNode)
			return true;

		ActiveSeg	= segs[segId];
		var legendDiv = document.getElementById('legend');
		
        if(legendDiv)
        {
                if (seatPrice[segId])
                {
                    if (seatPrice[segId].length > 0)
                    {
                        legendDiv.style.display = 'block';
                        legendDiv.innerHTML = "<div class='seatGroupLegendTitle'>" + localizedSeatGroupLegend + "</div>";
                    }
                    else
                    {
                        legendDiv.style.display = 'none';
                    }
		            // create requested legend
		            for(var grpNum in seatPrice[segId])
		            {
		                if (seatColor[segId] && seatColor[segId][grpNum])
		                {
		                    legendDiv.innerHTML += "<div class='seatGroupLegendItem'><div class='seatGroupLegendBox' style='background-color:" + seatColor[segId][grpNum] + "'></div><label class='seatGroupPriceLabel'>" + seatPrice[segId][grpNum] + "</label></div>";
		                }
		            }
		         }
		}
	}
	
	function displaySeatStatusLegend(segId)
	{
	    
	    if(!document.getElementById || !document.createTextNode)
			return true;
			
        var seatStatusHtml = "";
	    
	    var seatMap =  Map[ActiveSeg.id];
	    
		var legendDiv = document.getElementById('seatLegend');
		
		if (legendDiv && seatMap)
		{
		    legendDiv.innerHTML = "";
            
            
                seatStatusHtml += "<div id='seatLegendColumn1'><div class='seatStatusItem'><img src='"+ selectedSeatImgSrc +"'/>"+ legendSelectedText+"</div>";
		    seatStatusHtml += "<div class='seatStatusItem'><img src='"+ availableSeatImgSrc +"'/>"+ legendAvailableText+"</div>";
		    seatStatusHtml += "<div class='seatStatusItem'><img src='"+ occupiedSeatImgSrc +"'/>"+ legendOccupiedText+"</div>";
		   
		   //Uncomment the following code to show restricted seats 
//	        if (seatMap.hasRestrictedSeats)
//	        {
//	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ restrictedSeatImgSrc +"'/>"+ legendRestrictedText+"</div>";
//	        }
	       
	        //Uncomment the following code to show fleet blocked seats 
//	        if (seatMap.hasFleetBlockedSeats)
//	        {
//	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ fleetBlockedSeatImgSrc +"'/>" + legendFleetBlockedText + "</div>";
//	        }
	        
	        //Uncomment the following code to show bulkhead seats 
//	        if (seatMap.hasbulkHead)
//	        {
//	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ bulkHeadImgSrc +"'/>" + legendBulkheadText +"</div>";
//	        }
	        
//	        if (seatMap.hasEmergencyExit)
//	        {
	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ emergencyExitImgSrc +"'/>" + legendEmergencyExitText + "</div></div>";
//	        }
	        
	        if (seatMap.hasInfantSeat)
	        {
	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ infantSeatImgSrc +"'/>" + legendInfantText + "</div>";
	        }
	        
//	        if (seatMap.hasSmokingSeat)
//	        {
//	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ smokingSeatImgSrc +"'/>" + legendSmokingText + "</div>";
//	        }
//	        
	        if (seatMap.hasNearLavatorySeat)
	        {
	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ lavatorySeatImgSrc +"'/>" + legendNearLavatory + "</div>";
	        }
//	        if (seatMap.hasHandicapSeat)
//	        {
	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ handicapSeatImgSrc +"'/>" + legendHandicap + "</div>";
//	        }
	        if (seatMap.hasExtraOxygenSeat)
	        {
	            seatStatusHtml += "<div class='seatStatusItem'><img src='"+ extraOxygenSeatImgSrc +"'/>" + legendExtraOxygen + "</div>";
	        }
	     
	        legendDiv.innerHTML = seatStatusHtml;   
	    }
	    
	}

// =========== SEAT ASSIGNMENT METHODS ===========

	function populateBoxesAndSeats()
	{
		var ds	= document['SkySales'];
		var di	= document.images;

		for (var paxId in paxs)
		{
			if(paxs[paxId].segs[ActiveSeg.id].seat)
			{

				var sId = paxs[paxId].segs[ActiveSeg.id].seat.id;
				var s	= Map[ActiveSeg.id].seats[sId];

				if(s)
				{
						s.status	= 'S';
						s.paxId		= paxId;
						s.src		= eval('Seat' + s.size + 'S.src');
						s.title		= getSeatTitle(s);
						s.className	= "seatSelected";

						di[s.id].src		= s.src;
						//di[s.id].title		= s.title;
						di[s.id].className	= s.className;
						
				} // end if s
			}// end if seat exists for pax and seg
		} // end loop on pax
	}


	function assignSeat(sId)
	{
		var s	= Map[ActiveSeg.id].seats[sId];
		var di	= document.images;

		// If specified seat is A:vailable...
		if ((s)&&(s.status == 'A'))
		{
			// 1: Check if ActivePax is assigned somewhere else. If so
			var oldSeat	= paxs[ActivePax.id].segs[ActiveSeg.id].seat;
			if (!oldSeat || oldSeat.id != "")
			{
				// 1A: Revert old seat to available (status, paxId, src, title)
				// ... after checking that old seat exists (sanity check)
				if(oldSeat && Map[ActiveSeg.id].seats[oldSeat.id])
				{
					Map[ActiveSeg.id].seats[oldSeat.id].status		= "A";
					Map[ActiveSeg.id].seats[oldSeat.id].paxId		= "";
					Map[ActiveSeg.id].seats[oldSeat.id].src			= eval('Seat' + Map[ActiveSeg.id].seats[oldSeat.id].size + 'A.src');	// TODO: if I can figure out properties, would be nice to make this a property based on status
					//Map[ActiveSeg.id].seats[oldSeat.id].title			= getSeatTitle(oldSeat);								// TODO: why doesn't title automatically change when I change status?
					Map[ActiveSeg.id].seats[oldSeat.id].className	= 'seatAvailable';

					// 1B: Swap image src, title text
					di[oldSeat.id].src			= Map[ActiveSeg.id].seats[oldSeat.id].src;
					//di[oldSeat.id].title			= Map[ActiveSeg.id].seats[oldSeat.id].title;
					di[oldSeat.id].className	= Map[ActiveSeg.id].seats[oldSeat.id].className;
				}
			}

			// 2. assign ActivePax to new seat
			//		assign new seat (status, paxId, src, title)
			// ... after checking that old seat exists (sanity check)
			if(Map[ActiveSeg.id].seats[s.id])
			{
				Map[ActiveSeg.id].seats[s.id].status	= 'S';
				Map[ActiveSeg.id].seats[s.id].paxId		= ActivePax.id;
				Map[ActiveSeg.id].seats[s.id].src		= eval('Seat' + Map[ActiveSeg.id].seats[s.id].size + 'S.src');
				Map[ActiveSeg.id].seats[s.id].title		= getSeatTitle(s);
				Map[ActiveSeg.id].seats[s.id].className	= 'seatSelected';
			}
			
			// 3: Assign/reassign pax.segs[seg].seat
			paxs[ActivePax.id].segs[ActiveSeg.id].seat = s;

			// 4: Raise event that seat has been selected for a given pax and seg
			raise('SelectSeat', new SelectSeatEventArgs(ActivePax.id, ActiveSeg.id, s.id));

			// 5: Swap image src, title text
			di[s.id].src		= Map[ActiveSeg.id].seats[s.id].src;
			//di[s.id].title		= Map[ActiveSeg.id].seats[s.id].title;
			di[s.id].className	= Map[ActiveSeg.id].seats[s.id].className;

			// 6: Since seat has been assigned for this pax and seg, change active pax
			// to next paxt that don't have seat for this seg
			ActivePax = findNextActivePax(ActiveSeg.id);

			// raise event that a new active pax is selected
			if (paxs[ActivePax.id].segs[ActiveSeg.id].seat)
				nextSeatSelected = paxs[ActivePax.id].segs[ActiveSeg.id].seat.id;
			else
				nextSeatSelected = '';
			raise('SelectSeat', new SelectSeatEventArgs(ActivePax.id, 
				ActiveSeg.id, 
				nextSeatSelected));
			
		}
		// If specified seat is S:elected...
		else if ((s)&&(s.status == 'S'))
		{
			// 1: Determine pax assigned to seat

			if (confirm(localizedTextUnassignSeat1 + paxs[Map[ActiveSeg.id].seats[s.id].paxId].name + localizedTextUnassignSeat1))
			{
				var paxToRemove = Map[ActiveSeg.id].seats[s.id].paxId;
				// 2: Revert seat to available (status, paxId, src, title)
				Map[ActiveSeg.id].seats[s.id].status	= "A";
				Map[ActiveSeg.id].seats[s.id].paxId		= "";
				Map[ActiveSeg.id].seats[s.id].src		= eval('Seat' + Map[ActiveSeg.id].seats[s.id].size + 'A.src');	// TODO: if I can figure out properties, would be nice to make this a property based on status
				//Map[ActiveSeg.id].seats[s.id].title		= getSeatTitle(s);												// TODO: why doesn't title automatically change when I change status?
				Map[ActiveSeg.id].seats[s.id].className	= "seatAvailable";

				// 3: Clear the seat of paxToRemove
				paxs[paxToRemove].segs[ActiveSeg.id] = new paxSeg(ActiveSeg.id, "");
				raise('SelectSeat', new SelectSeatEventArgs(paxToRemove, ActiveSeg.id, ''));
				// Remove the paxid from the Map
				Map[ActiveSeg.id].seats[sId].paxId ="";

				// 4: Clear box 
				//boxToClear.value	= "";

				// 5: Swap image src, title text
				di[s.id].src		= Map[ActiveSeg.id].seats[s.id].src;
				//di[s.id].title		= Map[ActiveSeg.id].seats[s.id].title;
				di[s.id].className	= Map[ActiveSeg.id].seats[s.id].className;

				// 6: set the active pax to the pax whose seat was removed 
				// then raise event that active pax have changed
				if (paxToRemove != ActivePax.id)
				{
					ActivePax = paxs[paxToRemove];
					raise('SelectSeat', new SelectSeatEventArgs(ActivePax.id, ActiveSeg.id, ''));
				}
			}
		}
		else
		{
			// sanity check
		}

	}

	function findNextActivePax(segId)
	{
		var undefined;

		// Find the pax on this seg who doesn't have a seat assignment yet.		
		for (var paxId in paxs)
		{
			if ( paxs[paxId].segs[segId].seat == undefined || paxs[paxId].segs[segId].seat.id == "" )
			{
				return paxs[paxId];
			}
		} // end loop on paxs
		return paxs[ActivePax.id];	// stay put
	}													
	
// =========== EVENTS ===========
	// called when a seg is selected
	function selectSeatSeg(SelectSeatSegEventArgs)
	{
		if(!document.getElementById || !document.createTextNode)
			return true;

        // save the scroll position of the current active seg
	    var activeSegRef = document.getElementById('Map' +ActiveSeg.id);
	    
		if (activeSegRef)
		{
			ScrollPositions[ActiveSeg.id].scrollTop = document.getElementById('Map' +ActiveSeg.id).scrollTop;
        }
		
		var newSegRef = document.getElementById('Map' + ActiveSeg.id);
		if (newSegRef != null)
		{
		    newSegRef.innerHTML = "";
            var waitMessage = "<span class='seatMapWaitLabel'>";
	        waitMessage += waitMessageText;
	        waitMessage += "</span>";
	        newSegRef.innerHTML = waitMessage;
	    }

        //Small timeout so we can display the wait message on the div
		setTimeout("processSegmentChange('"+ SelectSeatSegEventArgs.segId + "')", 50);
	}
	
	function processSegmentChange(segId)
	{
        ActiveSeg = segs[segId];
	    displaySeatMap(segId);
        displayLegend(segId);
        displaySeatStatusLegend(segId);
	    // get the scroll position of the new active seg
	    var scroll = document.getElementById('Map' +segId);
	    if (scroll != null)
	    {
	        scroll.scrollTop = ScrollPositions[segId].scrollTop;
	    }
	}

	function selectSeatPax(SelectSeatPaxEventArgs)
	{
		ActivePax = paxs[SelectSeatPaxEventArgs.paxId];
	}
// =========== START UP CALLS ===========

	function SEATMAPINPUT_initialize()
	{
		// initialize scroll position
		if (segs != null)
		{
		    for (var segId in segs)
		    {
			    ScrollPositions[segId] = new ScrollPosition(0) ;
		    }		

		    displaySeatMap(ActiveSeg.id);	
		    displayLegend(ActiveSeg.id);	
		    displaySeatStatusLegend(ActiveSeg.id);
        }
	}

document.onmousemove = captureMousePosition;
var mouseX = 0;
var mouseY = 0;

function captureMousePosition(e)
{
    var posx = 0;
	var posy = 0;
	if (!e) 
	{
	    var e = window.event;
	}
	if (e.pageX || e.pageY)
	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	mouseX = posx;
	mouseY = posy;
}

//Hints javascript
function showSeatHint(seatId)
{
    seat = Map[ActiveSeg.id].seats[seatId];
    
    /*
    var xOffset = 625;
    var yOffset = 163;
    x = window.event.x;
    y = window.event.y;
    */
    
    var xOffset = 10;
    var yOffset = 10;
    
    mouseX += xOffset;
    mouseY += yOffset;
    
    var hintHtml = seat.title;
	
	//Get server hint
	getObject('cssHint').innerHTML      = hintHtml;
	getStyle('cssHint').visibility 	    = 'visible';
	getStyle('cssHint').left 			= mouseX + 'px';
	getStyle('cssHint').top 			= mouseY + 'px';
	//getStyle(hintDiv).height = 50;
	
}

function getSeatStatus(seat)
{
    switch (seat.status)
    {
        case 'O': return localizedTextOccupiedByOtherPax; 
        case 'A': return localizedTextAvailable;
        case 'B': return localizedTextBlocked;			
        case 'S': return localizedTextOccupiedBy + paxs[seat.paxId].name;
        case 'F': return localizedTextFleetBlocked;
        case 'R': return localizedTextRestricted;
        default:  return "";  // M:issing
    }
}
function hideHint()
{
	getStyle('cssHint').visibility 	= 'hidden';
}


//End of hints