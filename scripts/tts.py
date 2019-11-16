#!/usr/bin/python2.7
import sys
import parse

parser = parse.get_arg_parser()
args = parser.parse_args()
print(args.text,args.volume,args.pitch,args.speed,args.ip)

if sys.version_info[0] > 2:
    raise Exception("Python 2 is required.")


if args.text:
    from naoqi import ALProxy

    tts = ALProxy("ALTextToSpeech", args.ip, 9559)
    
    if args.volume:
        tts.setParameter('volume',args.volume)
    if args.pitch:
        tts.setParameter('pitchShift', args.pitch)
    if args.speed:
        tts.setParameter('speed',args.speed)

    tts.say(args.text)
# if (len(sys.argv)>1):
#     from naoqi import ALProxy

#     tts = ALProxy("ALTextToSpeech", "10.0.1.133", 9559)
    
#     tts.say(sys.argv[1])