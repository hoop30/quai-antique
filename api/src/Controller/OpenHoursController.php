<?php

namespace App\Controller;

use App\Entity\OpenHours;
use App\Repository\OpenHoursRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class OpenHoursController extends AbstractController
{
    #[Route('/openhours', name: 'onpenhours_get', methods: ["GET"])]
    public function userGet(OpenHoursRepository $onpenHoursRepository)
    {
        // return all the days of userRepository
        return $this->json($onpenHoursRepository->findAll(), 200, []);
    }

    #[Route('/openhours', name: 'onpenhours_new', methods: ["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new user with the data
        $newOnpenhours = $serializer->deserialize($data, OpenHours::class, 'json');
        // send new user to the DB
        $em->persist($newOnpenhours);
        $em->flush();
        // return the new user
        return $this->json($newOnpenhours, 201, []);
    }

    #[Route('/openhours', name: 'onpenhours_update', methods: ["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, OpenHoursRepository $onpenHoursRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateOpenHours = $serializer->deserialize($data, OpenHours::class, 'json');
        $id = $updateOpenHours->getId();
        // find the user to update
        $openHours = $onpenHoursRepository->find($id);
        // update
        $openHours
            ->setType($updateOpenHours->getType())
            ->setOpen($updateOpenHours->getOpen())
            ->setClose($updateOpenHours->getClose());

        // update send in DB
        $em->persist($openHours);
        $em->flush();

        // reurn the update user
        return $this->json($openHours, 201, []);
    }
}
