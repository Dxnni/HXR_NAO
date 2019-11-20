#!/usr/bin/python2.7
import sys
import parse
from naoqi import ALProxy

parser = parse.get_full_parser()
args = parser.parse_args()

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


if args.text:

    tts = ALProxy("ALTextToSpeech", args.ip, 9559)
        
    if args.pitch:
        tts.setParameter('pitchShift', args.pitch)
    if args.speed:
        tts.setParameter('speed',args.speed)
    if args.volume:
        tts.setVolume(args.volume)

    tts.say(args.text)
