#!/usr/bin/python2.7
import sys
import time

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

from naoqi import ALProxy

robotIP = "10.0.1.19"
if argv[1]
    robotIP = argv[1]

posture = ALProxy("ALRobotPosture", robotIP, 9559)
motion = ALProxy("ALMotion", robotIP, 9559)

#Setting Up movement:

#wake up robot
motion.wakeUp()
#goToPosture(postureName, 0-1 for speed)
posture.goToPosture("StandInit", 0.5)
#sets arm movements
motion.setMoveArmsEnabled(True, True)
#Initialize move process
motion.moveInit()


#Movements:

#moveToward(-1->1 for forward speed, -1->1 for left speed, -1->1 for counter clockwise speed, config?)
#motion.moveToward(sys.argv[1], sys.argv[2], sys.argv[3])
motion.moveToward(0.5,0,0)
#5 second delay before next command
time.sleep(5.0)


#Done Moving:

#stop moving
motion.stopMove()
#go to rest position
motion.rest()