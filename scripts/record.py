#!/usr/bin/python2.7
import sys
import time
from naoqi import ALProxy
import parse

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")

parser = parse.get_full_parser()
args= parser.parse_args()

vid = ALProxy("ALVideoRecorder", args.ip, 9559)

#startRecording(folderPath, fileName)
vid.startRecording("/home/nao/recordings/cameras","testVidFeed")

# wait given secs before next command
time.sleep(args.secs)

#stopRecording(): [num of recorded frames, absolute file path of vid]
output = vid.stopRecording()

print(output)
