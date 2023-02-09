<?php

namespace App\Controller;

use App\Entity\Days;
use App\Repository\DaysRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DaysController extends AbstractController
{
    #[Route('/days', name: 'days_get', methods: ["GET"])]
    public function userGet(DaysRepository $daysRepository)
    {
        // return all the days of userRepository
        return $this->json($daysRepository->findAll(), 200, []);
    }

    #[Route('/days', name: 'days_new', methods: ["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new user with the data
        $newDays = $serializer->deserialize($data, Days::class, 'json');
        // send new user to the DB
        $em->persist($newDays);
        $em->flush();
        // return the new user
        return $this->json($newDays, 201, []);
    }

    #[Route('/days', name: 'days_update', methods: ["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, DaysRepository $daysRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateDays = $serializer->deserialize($data, Days::class, 'json');
        $id = $updateDays->getId();
        // find the user to update
        $days = $daysRepository->find($id);
        // update
        $days
            ->setValue($updateDays->getValue())
            ->setType($updateDays->getType());

        // update send in DB
        $em->persist($days);
        $em->flush();

        // reurn the update user
        return $this->json($days, 201, []);
    }
}
