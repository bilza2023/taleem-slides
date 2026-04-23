

Track System : Lets call this track system 

 - Each item creates a track --which tells us when an item is visible , hidden , wiggle etc etc. 
 - Each item = 1 track .
 - All the tracks collected is the presentation. 

ok since the above is valid so lets brain storm -- do not think how slides will fit into this lets go bold and then re-consile ok 

New ideas
1: we just add items not slides, slides does not exist at this lower level --here we just have items .

2: Each item just like befor has its "endTime" BUT now it also has start (start time) AND the location. 

3: Why item to carry end-time since it is not free from slide end time.

4: The location can be few presenlected locations.on the screen.

---------
The issue with this system is location - if we use x,y then it may work but if we use normal css layout then each location has to be a slot --- so we have track+slot system but 

any any case we will need to have different layout of slots -- so then that becomes slide

--- so we can not get rid of slide since slide is layout + (v important) layout for those slots. 

==> How to merge slide with track system.

option 1 : Slide is also a Track -- which has different layout at different times

option 2: We can have locations but no layout. suppose we have 4 locations left-top , left bottom , right top and right bottom . these are 4 slots / locations ready for us to anchor any thing onto it any time. we also have a banner location. 

----> slide does not just give location it decides css flow --- 
so slide other than end-time give us layout + css  + css flow.

SO WE KEEP slides ==this mean item.end-time is back with the slide. 

this measn if we show some thing once we can not re-show it ----
if we try we can over come this but wil be problematc --- SO --- we are back to
Track-based - slide based --progressive reveal --- 
why progressive reveal --since all items show once and then go away --- if you want to show gain create new --this is the progressive reveal. 

OK : Now we should talk about --- item track BUT inside slide 


 

