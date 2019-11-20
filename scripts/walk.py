#!/usr/bin/python2.7
import sys
import time
from naoqi import ALProxy
import parse 


if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


parser = parse.get_full_parser()
args = parser.parse_args()

posture = ALProxy("ALRobotPosture", args.ip, 9559)
motion = ALProxy("ALMotion", args.ip, 9559)


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

# wait given secs before next command
time.sleep(args.secs)


#Done Moving:

#stop moving
motion.stopMove()
#go to rest position
motion.rest()
