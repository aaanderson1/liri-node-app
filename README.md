# liri-node-app
**Creator**: `Allison Anderson`
**Created on**: `5/18/19`
- - -
## ABOUT THE APP

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### **Step by Step instructions**

1. Open terminal

2. Open `liri.js` 

3. Depending on the command you run, the output will vary. 

    **Example 1**: Run the `concert-this` command

        node liri.js concert-this <name of artist or band> 

    Output: Terminal will show a list of all events and locations where the artist is playing.
    
    See screenshot:

    ![Results](/screenshots/concert-this.png)

    **Example 2**: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: Terminal will show song info.
    
    See screenshot:

    ![Results](/screenshots/spotify-this-song.png)

    **Example 3**: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: Terminal will show movie info.
    
    See screenshot:

    ![Results](/screenshots/movie-this.png)


    **Example 4**: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: Terminal will show data from random.txt file, and run search against data within. 
    
    See screenshots:

    ![Results](/screenshots/do-what-it-says1.png)
    ![Results](/screenshots/do-what-it-says2.png)
