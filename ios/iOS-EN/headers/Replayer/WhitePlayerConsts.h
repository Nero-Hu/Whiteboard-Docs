//
//  WhitePlayerConsts.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/3.
//

#ifndef WhitePlayerConsts_h
#define WhitePlayerConsts_h

/** The mode for watching the whiteboard playback.*/
typedef NS_ENUM(NSInteger, WhiteObserverMode) {
   /**
   （(Default) Follower mode.
    In this mode, the user watches the playback from one of the following views:

    - The view of the host, if there is a host in the live Interactive Whiteboard room when the recording is made. 
    - The view of the first user who joins the room in interactive mode, as long as there is no host in the live Interactive Whiteboard room when the recording is made.
    - The initial view of the whiteboard, as long as there is neither a host nor users in interactive mode in the live Interactive Whiteboard room when the recording is made.
   
    Note: If the user in `directory` mode adjusts their view through touch screen gestures, the SDK automatically switches their mode to `freedom`.
    */
    WhiteObserverModeDirectory, 
    /**
     Freedom mode.
    
     In this mode, the user can freely adjust their view when watching the playback.
     */
    WhiteObserverModeFreedom   
};
/**
 The phase of the whiteboard playback.
 */
typedef NS_ENUM(NSInteger, WhitePlayerPhase) {
    /**
     The SDK is waiting for the first frame of the playback, which is the initial phase.
     */
    WhitePlayerPhaseWaitingFirstFrame,  
    /**
     The playback is playing.
     */
    WhitePlayerPhasePlaying, 
    /**
     The playback is paused.
     */          
    WhitePlayerPhasePause,
    /**
     The playback has stopped.
     */             
    WhitePlayerPhaseStopped, 
    /**
     The playback has finished.
     */       
    WhitePlayerPhaseEnded,   
    /**
     The playback is buffering.
     */           
    WhitePlayerPhaseBuffering,      
};

#endif /* WhitePlayerConsts_h */
